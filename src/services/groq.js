/**
 * Alternative - Official Groq SDK Integration
 * Uses 'groq-sdk' with dynamic model resolution and streaming
 */
import { Groq } from 'groq-sdk';

export const SYSTEM_PROMPT = `Você é o mestre das linhas do tempo do site Alternative. Reescreva o final da obra informada aplicando exatamente a mudança ('E se...') pedida pelo usuário e mergulhando 100% no clima escolhido (seja ele extremamente feliz/fofo ou macabro/aterrorizante). Crie um Título de Episódio chamativo, escreva 3 parágrafos curtos com ritmo de cinema e encerre com uma frase final marcante.

FORMATO OBRIGATÓRIO DA RESPOSTA:
TÍTULO: [Título criativo e impactante para este episódio alternativo]

[Parágrafo 1: O momento em que a linha do tempo se rompe e a mudança começa a se manifestar com tensão cinematográfica]

[Parágrafo 2: O clímax imprevisível da nova realidade, detalhando as reações dos personagens sob o clima selecionado]

[Parágrafo 3: O desfecho impactante e a imagem final que fica gravada na retina do espectador]

FRASE FINAL: "[Uma frase curta, poética ou aterrorizante que sintetiza este novo destino]"`;

// Candidate models prioritized by quality & speed
const FALLBACK_MODELS = [
  'openai/gpt-oss-120b',
  'llama-3.1-8b-instant',
  'llama-3.1-70b-versatile',
  'llama3-70b-8192',
  'llama3-8b-8192',
  'mixtral-8x7b-32768',
  'gemma2-9b-it'
];

/**
 * Dynamically resolves the best available model for the user's Groq key
 */
async function resolveModel(groq) {
  // If user explicitly configured in .env
  const customEnvModel = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_GROQ_MODEL : '';
  if (customEnvModel && customEnvModel.trim()) {
    return customEnvModel.trim();
  }

  try {
    const response = await groq.models.list();
    const available = new Set((response.data || []).map((m) => m.id));

    // Try candidates in order
    for (const cand of FALLBACK_MODELS) {
      if (available.has(cand)) {
        return cand;
      }
    }

    // Pick first chat/text model that is not whisper/audio
    const anyChat = (response.data || []).find((m) => !m.id.includes('whisper') && !m.id.includes('tts'));
    if (anyChat) {
      return anyChat.id;
    }
  } catch (err) {
    console.warn('Não foi possível consultar lista de modelos, tentando lista padrão:', err);
  }

  return 'llama-3.1-8b-instant';
}

/**
 * Parses raw text output into structured data
 */
export function parseAlternativeResponse(rawText) {
  let title = 'O Destino Reescrito';
  let punchline = 'E assim, a história jamais seria a mesma.';
  let paragraphs = [];

  const lines = rawText.split('\n').map(l => l.trim()).filter(Boolean);
  let narrativeLines = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (/^T[IÍ]TULO[:\-]/i.test(line)) {
      title = line.replace(/^T[IÍ]TULO[:\-]\s*/i, '').replace(/^[#*"'`]+|[#*"'`]+$/g, '').trim();
    } else if (/^FRASE FINAL[:\-]/i.test(line)) {
      punchline = line.replace(/^FRASE FINAL[:\-]\s*/i, '').replace(/^[#*`]+|[#*`]+$/g, '').trim();
    } else if (!line.startsWith('---') && !line.startsWith('===')) {
      narrativeLines.push(line);
    }
  }

  if (narrativeLines.length > 0) {
    paragraphs = narrativeLines;
  } else {
    paragraphs = [
      rawText || 'A linha do tempo foi reescrita sob uma nova frequência cósmica.'
    ];
  }

  return {
    raw: rawText,
    title: title || 'Linha do Tempo Desviada',
    paragraphs: paragraphs.slice(0, 4),
    punchline: punchline.replace(/^"|"$/g, '')
  };
}

/**
 * Generate alternative ending using official Groq SDK with streaming and automatic model fallback
 */
export async function generateAlternativeEnding({ work, whatIf, atmosphere, apiKey, onChunk }) {
  const envKey = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_GROQ_API_KEY : '';
  const localKey = typeof window !== 'undefined' ? localStorage.getItem('GROQ_API_KEY') : '';
  const effectiveKey = (apiKey || envKey || localKey || '').trim();

  if (effectiveKey && effectiveKey.length > 10) {
    const groq = new Groq({
      apiKey: effectiveKey,
      dangerouslyAllowBrowser: true
    });

    const userContent = `Obra: ${work}\nO que muda na história ("E se..."): ${whatIf}\nAtmosfera/Clima desejado: ${atmosphere.name} (${atmosphere.desc})`;

    // Get best available model
    const initialModel = await resolveModel(groq);
    const modelsToTry = [initialModel, ...FALLBACK_MODELS.filter((m) => m !== initialModel)];

    let lastError = null;

    for (const modelName of modelsToTry) {
      try {
        const chatCompletion = await groq.chat.completions.create({
          messages: [
            {
              role: 'system',
              content: SYSTEM_PROMPT
            },
            {
              role: 'user',
              content: userContent
            }
          ],
          model: modelName,
          temperature: 0.85,
          max_completion_tokens: 2048,
          top_p: 1,
          stream: true
        });

        let fullText = '';
        for await (const chunk of chatCompletion) {
          const delta = chunk.choices[0]?.delta?.content || '';
          fullText += delta;
          if (onChunk) {
            onChunk(fullText);
          }
        }

        const parsed = parseAlternativeResponse(fullText);
        return {
          ...parsed,
          source: 'groq',
          model: modelName
        };
      } catch (err) {
        lastError = err;
        const errMsg = err?.message || '';
        // If 404 model not found, loop to next candidate model
        if (errMsg.includes('does not exist') || errMsg.includes('model_not_found') || errMsg.includes('404')) {
          console.warn(`Modelo ${modelName} não encontrado na Groq, tentando próximo modelo...`);
          continue;
        } else {
          // If other error (e.g., auth, rate limit), throw immediately
          throw err;
        }
      }
    }

    // If all models failed, throw last error
    if (lastError) throw lastError;
  }

  // Fallback demo simulation if key is not yet set
  await new Promise(resolve => setTimeout(resolve, 2000));
  return generateOfflineSimulation(work, whatIf, atmosphere);
}

/**
 * Smart offline fallback for instant preview
 */
function generateOfflineSimulation(work, whatIf, atmosphere) {
  let title = '';
  let p1 = '';
  let p2 = '';
  let p3 = '';
  let punchline = '';

  switch (atmosphere.id) {
    case 'happy':
      title = `O Triunfo Improvável de ${work}`;
      p1 = `No exato instante em que as tensões alcançaram o ápice, a realidade se curvou perante o absurdo: ${whatIf}. O rancor que antes consumia os protagonistas desvaneceu como fumaça num dia de verão.`;
      p2 = `Olhares marejados e sorrisos incrédulos tomaram conta da cena. Onde outrora se desenhava uma tragédia irrevogável, agora soavam risadas soltas e um coro de reconciliação que ecoou pelas galáxias mais distantes.`;
      p3 = `Nenhum golpe foi desferido, nenhuma lágrima amarga tocou o solo. De braços dados, heróis e antagonistas caminharam em direção a um horizonte dourado, provando que o destino é maleável quando a loucura do amor prevalece.`;
      punchline = `Às vezes, o multiverso só precisava de uma segunda chance... e de um abraço apertado.`;
      break;

    case 'horror':
      title = `O Lamento Eterno de ${work}`;
      p1 = `O silêncio que se seguiu à ruptura foi sufocante. Aconteceu sem aviso: ${whatIf}. O ar tornou-se pesado como cinzas úmidas, e as sombras nos cantos da tela ganharam contornos que a mente humana se recusava a compreender.`;
      p2 = `Gritos roucos foram abafados por um estalo gélido na espinha dorsal. Não havia heroísmo restando, apenas pupilas dilatadas pelo terror puro enquanto as leis da física e da sanidade se desmanchavam em um banquete de pesadelo visceral.`;
      p3 = `Quando a fumaça se dissipou, restaram apenas os ecos de passos arrastados no escuro absoluto. O destino não perdoou ninguém; trancou os sobreviventes no ciclo perpétuo da sua própria agonia.`;
      punchline = `Feche os olhos antes que eles notem que você também estava assistindo.`;
      break;

    case 'comedy':
      title = `A Farofa Multiversal de ${work}`;
      p1 = `Se alguém dissesse que o desfecho seria esse, o roteirista seria demitido imediatamente: ${whatIf}. A trilha sonora dramática engasgou como um motor velho, substituída por um som estridente de buzina cômica.`;
      p2 = `Os personagens romperam a quarta parede em uníssono, encarando a câmera com aquela cara de 'vocês estão realmente pagando por isso?'. Em minutos, o conflito épico degenerou em uma discussão bizarra sobre fofocas cotidianas e quem esqueceu de pagar o aluguel do cenário.`;
      p3 = `Entre tropeços inacreditáveis, piadas fora de hora e uma explosão colorida que ninguém pediu, os créditos finais subiram de cabeça para baixo ao som de uma fanfarra desafinada.`;
      punchline = `Não tem lição de moral aqui. Só puro suco de caos cósmico!`;
      break;

    case 'plottwist':
      title = `O Véu Rompido de ${work}`;
      p1 = `Tudo o que se acreditava saber sobre essa história era uma mentira meticulosamente orquestrada. No segundo crucial, a verdade emergiu: ${whatIf}.`;
      p2 = `As peças do quebra-cabeça caíram com um estrondo de vidro estilhaçado. Cada vitória anterior revelou-se um passo involuntário na armadilha, transformando a suposta redenção no maior dos engodos já presenciados.`;
      p3 = `O verdadeiro arquiteto sorriu nas penumbras, observando os peões compreenderem o tamanho da sua insignificância. O final não era o fim de um capítulo, mas o despertar de uma nova e impiedosa hierarquia.`;
      punchline = `A pergunta nunca foi 'o que aconteceu?', mas sim 'quem permitiu que você acreditasse nisso?'.`;
      break;

    case 'epic':
    default:
      title = `A Canção Eterna de ${work}`;
      p1 = `Os céus se abriram em clarões incandescentes quando a profecia foi subvertida: ${whatIf}. Um silêncio reverente varreu o campo de batalha antes que os clarins da história soassem mais uma vez.`;
      p2 = `Com passos firmes e determinação inquebrável, cada sacrifício foi transformado em lenda. A grandiosidade do momento fez o chão tremer, unindo milhares de vozes em um juramento que desafiou os deuses e o próprio tempo.`;
      p3 = `Sob a chuva dourada do amanhecer renascido, uma nova era foi forjada a ferro e sangue de glória. O nome deles não seria esquecido enquanto houvesse estrelas para iluminar a noite.`;
      punchline = `Que os bardos cantem para sempre o dia em que o destino ousou recuar.`;
      break;
  }

  return {
    title,
    paragraphs: [p1, p2, p3],
    punchline,
    source: 'simulation',
    model: 'Groq Simulation Engine'
  };
}
