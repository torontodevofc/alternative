export const ATMOSPHERES = [
  {
    id: 'happy',
    name: 'Final Feliz Absurdo',
    icon: 'Sun',
    desc: 'Arco-íris, abraços cósmicos, redenção exagerada e alegria pura.',
    badge: 'Linha do Tempo Extasiante & Feliz',
    borderColor: 'border-amber-400/70 hover:border-amber-300',
    selectedRing: 'ring-2 ring-amber-400 bg-amber-500/10 shadow-[0_0_25px_rgba(251,191,36,0.35)]',
    accentColor: 'from-amber-300 via-yellow-400 to-amber-500',
    iconColor: 'text-amber-400',
    badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-400/40',
    vibe: 'happy'
  },
  {
    id: 'horror',
    name: 'Terror & Pesadelo',
    icon: 'Skull',
    desc: 'Clima macabro, suspense sufocante, mortes brutais e paranoia sem volta.',
    badge: 'Linha do Tempo Sombria & Macabra',
    borderColor: 'border-rose-600/70 hover:border-rose-500',
    selectedRing: 'ring-2 ring-rose-600 bg-rose-950/40 shadow-[0_0_25px_rgba(225,29,72,0.45)]',
    accentColor: 'from-red-600 via-rose-700 to-purple-950',
    iconColor: 'text-rose-500',
    badgeClass: 'bg-rose-900/40 text-rose-300 border-rose-600/50',
    vibe: 'horror'
  },
  {
    id: 'comedy',
    name: 'Comédia Caótica',
    icon: 'Laugh',
    desc: 'Non-sense descontrolado, quebra de 4ª parede e vergonha alheia galáctica.',
    badge: 'Linha do Tempo Caótica & Cômica',
    borderColor: 'border-cyan-400/70 hover:border-cyan-300',
    selectedRing: 'ring-2 ring-cyan-400 bg-cyan-500/10 shadow-[0_0_25px_rgba(34,211,238,0.35)]',
    accentColor: 'from-cyan-400 via-teal-400 to-emerald-400',
    iconColor: 'text-cyan-400',
    badgeClass: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40',
    vibe: 'comedy'
  },
  {
    id: 'plottwist',
    name: 'Plot Twist Sombrio',
    icon: 'Eye',
    desc: 'Uma reviravolta psicológica que destrói todas as certezas da trama.',
    badge: 'Linha do Tempo Distorcida (Plot Twist)',
    borderColor: 'border-purple-500/70 hover:border-purple-400',
    selectedRing: 'ring-2 ring-purple-500 bg-purple-950/40 shadow-[0_0_25px_rgba(168,85,247,0.4)]',
    accentColor: 'from-purple-400 via-violet-600 to-indigo-900',
    iconColor: 'text-purple-400',
    badgeClass: 'bg-purple-900/30 text-purple-300 border-purple-500/40',
    vibe: 'twist'
  },
  {
    id: 'epic',
    name: 'Épico de Cinema',
    icon: 'Flame',
    desc: 'Trilha orquestral retumbante, sacrifícios homéricos e glória lendária.',
    badge: 'Linha do Tempo Triunfante & Heroica',
    borderColor: 'border-indigo-500/70 hover:border-indigo-400',
    selectedRing: 'ring-2 ring-indigo-500 bg-indigo-950/40 shadow-[0_0_25px_rgba(99,102,241,0.35)]',
    accentColor: 'from-indigo-400 via-blue-500 to-sky-400',
    iconColor: 'text-indigo-400',
    badgeClass: 'bg-indigo-900/30 text-indigo-300 border-indigo-500/40',
    vibe: 'epic'
  }
];

export const SURPRISE_IDEAS = [
  {
    work: 'Toy Story',
    whatIf: 'E se o Woody e os brinquedos do Andy fossem na verdade uma seita sobrenatural de marionetes demoníacas que punem qualquer criança que não brinque direito?',
    atmosphereId: 'horror',
    tag: 'Infantil ➔ Terror Macabro'
  },
  {
    work: 'Invocação do Mal',
    whatIf: 'E se a entidade Bathsheba e os demônios da casa só quisessem organizar uma festa de noivado surpresa com rodízio de pizza para Ed e Lorraine Warren?',
    atmosphereId: 'happy',
    tag: 'Terror ➔ Final Feliz Fofo'
  },
  {
    work: 'Titanic',
    whatIf: 'E se o iceberg fosse na verdade um Transformer alienígena colossal que salvou o navio, serviu coquetéis tropicais e levou todos em festa direto para Miami?',
    atmosphereId: 'comedy',
    tag: 'Drama ➔ Comédia Caótica'
  },
  {
    work: 'Shrek',
    whatIf: 'E se Lord Farquaad estivesse tentando salvar o reino de um feitiço parasita, e Shrek fosse a manifestação de um pesadelo ancestral feito de cebola e loucura?',
    atmosphereId: 'plottwist',
    tag: 'Animação ➔ Plot Twist Sombrio'
  },
  {
    work: 'Interestelar',
    whatIf: 'E se dentro do buraco negro Gargantua, Cooper e TARS descobrissem que os seres da quinta dimensão eram apenas garçons gaúchos numa churrascaria intergaláctica?',
    atmosphereId: 'comedy',
    tag: 'Ficção Científica ➔ Pastelão'
  },
  {
    work: 'O Iluminado (The Shining)',
    whatIf: 'E se Jack Torrance encontrasse no Hotel Overlook um grupo holístico de meditação guiada e resolvesse todos os seus traumas escrevendo poesias para Wendy e Danny?',
    atmosphereId: 'happy',
    tag: 'Suspense ➔ Paz & Amor'
  },
  {
    work: 'Vingadores: Ultimato',
    whatIf: 'E se quando Thanos estalou os dedos pela segunda vez, as Joias do Infinito exigissem uma batalha de rimas de rap contra Tony Stark pelo destino do universo?',
    atmosphereId: 'epic',
    tag: 'Ação ➔ Duelo Lendário'
  },
  {
    work: 'Procurando Nemo',
    whatIf: 'E se Nemo nunca tivesse sido capturado, mas sim recrutado como o chefe de espionagem aquática dos tubarões contra a frota da marinha humana?',
    atmosphereId: 'plottwist',
    tag: 'Aventura ➔ Submundo do Crime'
  },
  {
    work: 'Harry Potter: As Relíquias da Morte',
    whatIf: 'E se no confronto final em Hogwarts, Voldemort e Harry descobrissem que compartilhavam o mesmo sonho de abrir uma cafeteria fofa em Hogsmeade?',
    atmosphereId: 'happy',
    tag: 'Fantasia ➔ Amizade Inesperada'
  },
  {
    work: 'O Silêncio dos Inocentes',
    whatIf: 'E se o Dr. Hannibal Lecter decidisse se tornar um influenciador fitness vegano no TikTok para ensinar receitas de saladas e autoconhecimento para Clarice?',
    atmosphereId: 'comedy',
    tag: 'Thriller ➔ Viral Cômico'
  }
];

export const FEATURED_EXAMPLES = [
  {
    work: 'Titanic',
    whatIf: 'E se Jack subisse na porta de madeira junto com Rose, mas o peso excessivo rompesse um portal abissal para a cidade perdida de Atlântida?',
    atmosphereId: 'epic',
    atmosphereName: 'Épico de Cinema',
    badge: 'Expedição Submarina',
    preview: 'A madeira rangeu, mas o oceano não engoliu dois amantes... abriu-se diante deles em estátuas de coral e cânticos de civilizações esquecidas.'
  },
  {
    work: 'Shrek',
    whatIf: 'E se Shrek aceitasse a proposta de virar o Imperador Supremo de Tão Tão Distante e banisse todos os cavalos brancos em favor de carruagens puxadas por ogros com armaduras?',
    atmosphereId: 'plottwist',
    atmosphereName: 'Plot Twist Sombrio',
    badge: 'A Era Verde',
    preview: 'A coroa de ouro agora repousava sobre orelhas pontudas. O pântano já não era um refúgio: o mundo inteiro havia se tornado o pântano de Shrek.'
  },
  {
    work: 'Interestelar',
    whatIf: 'E se a poeira que assolava a Terra fosse na verdade poeira estelar inteligente tentando avisar que o planeta era um ovo gigante prestes a chocar?',
    atmosphereId: 'horror',
    atmosphereName: 'Terror & Pesadelo',
    badge: 'Despertar Cósmico',
    preview: 'O chão tremeu não pela seca, mas pelas pulsações de um coração do tamanho de continentes. Cooper olhou para o céu e percebeu que as estrelas estavam nos vigiando.'
  }
];

export const LOADING_MESSAGES = [
  'Alterando a linha do tempo primordial...',
  'Invocando roteiristas do multiverso...',
  'Rasgando o tecido da continuidade do cânone...',
  'Sussurrando novas ideias para os protagonistas...',
  'Distorcendo memórias e reescrevendo o destino...',
  'Sintonizando a frequência da Groq Llama 3.3...',
  'Compilando o desfecho cinematográfico...'
];
