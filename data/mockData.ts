import { Event, Exhibitor, News } from '~/store/store';

// Mock Events
export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Leilão de Gado Nelore',
    description: 'Leilão anual com exemplares premiados da raça Nelore',
    date: '2025-05-23',
    time: '14:00',
    location: 'Pavilhão Central',
    category: 'leilao',
    image: 'https://images.unsplash.com/photo-1516467716199-8b782a7fa3f6?q=80&w=1470&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'Show Bruno & Marrone',
    description: 'Show da dupla sertaneja com os maiores sucessos',
    date: '2025-05-24',
    time: '21:00',
    location: 'Palco Principal',
    category: 'show',
    image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=1474&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'Cavalgada Solidária',
    description: 'Percurso de 10km com arrecadação para hospital local',
    date: '2025-05-25',
    time: '08:00',
    location: 'Ponto de Partida - Entrada Norte',
    category: 'cavalgada',
    image: 'https://images.unsplash.com/photo-1575908539614-ff89490f4a78?q=80&w=1470&auto=format&fit=crop',
  },
  {
    id: '4',
    title: 'Palestra: Agricultura de Precisão',
    description: 'Dr. João Silva apresenta as mais novas tecnologias para o campo',
    date: '2025-05-22',
    time: '16:00',
    location: 'Auditório Sul',
    category: 'palestra',
    image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=1471&auto=format&fit=crop',
  },
  {
    id: '5',
    title: 'Rodeio Profissional',
    description: 'Competição com os melhores peões do país',
    date: '2025-05-25',
    time: '19:00',
    location: 'Arena de Rodeio',
    category: 'rodeio',
    image: 'https://images.unsplash.com/photo-1581376436131-e2013344fd5f?q=80&w=1470&auto=format&fit=crop',
  },
];

// Mock Exhibitors
export const mockExhibitors: Exhibitor[] = [
  {
    id: '1',
    name: 'Tratores Brasil',
    sector: 'Maquinário',
    description: 'Maior concessionária de tratores do Brasil, oferecendo os mais modernos equipamentos para o campo.',
    logo: 'https://images.unsplash.com/photo-1569986728389-6ccf11186899?q=80&w=1374&auto=format&fit=crop',
    catalog: [
      'https://images.unsplash.com/photo-1569986728389-6ccf11186899?q=80&w=1374&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1625994278797-fa7edd6519ac?q=80&w=1470&auto=format&fit=crop',
    ],
    contact: {
      whatsapp: '+5511999999999',
      phone: '+551134567890',
      website: 'www.tratoresbrasil.com.br',
    },
    location: {
      latitude: -22.9091,
      longitude: -47.0572,
    },
  },
  {
    id: '2',
    name: 'Sementes Ouro',
    sector: 'Insumos',
    description: 'Desenvolvimento e comercialização de sementes de alta qualidade para diversos tipos de cultivo.',
    logo: 'https://images.unsplash.com/photo-1620857493579-8ce59bffc3cb?q=80&w=1470&auto=format&fit=crop',
    catalog: [
      'https://images.unsplash.com/photo-1620857493579-8ce59bffc3cb?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1559881230-3a63de1e74e1?q=80&w=1470&auto=format&fit=crop',
    ],
    contact: {
      whatsapp: '+5511988888888',
      phone: '+551145678901',
      website: 'www.sementesouro.com.br',
    },
    location: {
      latitude: -22.9122,
      longitude: -47.0611,
    },
  },
  {
    id: '3',
    name: 'Rancho Boi Forte',
    sector: 'Pecuária',
    description: 'Referência na criação de gado Nelore de elite, com genética superior e manejo sustentável.',
    logo: 'https://images.unsplash.com/photo-1545157000-85f257f7b046?q=80&w=1469&auto=format&fit=crop',
    catalog: [
      'https://images.unsplash.com/photo-1545157000-85f257f7b046?q=80&w=1469&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544904452-7ee0cb07e237?q=80&w=1470&auto=format&fit=crop',
    ],
    contact: {
      whatsapp: '+5511977777777',
      phone: '+551156789012',
      website: 'www.boiforte.com.br',
    },
    location: {
      latitude: -22.9155,
      longitude: -47.0582,
    },
  },
  {
    id: '4',
    name: 'Laticínios Vale Verde',
    sector: 'Alimentos',
    description: 'Produção artesanal de queijos, manteiga e outros derivados do leite, seguindo tradições familiares.',
    logo: 'https://images.unsplash.com/photo-1628088062856-d2abb4038d05?q=80&w=1470&auto=format&fit=crop',
    catalog: [
      'https://images.unsplash.com/photo-1628088062856-d2abb4038d05?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1566751959960-aaa53a1136eb?q=80&w=1470&auto=format&fit=crop',
    ],
    contact: {
      whatsapp: '+5511966666666',
      phone: '+551167890123',
      website: 'www.laticiniosvaleverde.com.br',
    },
    location: {
      latitude: -22.9195,
      longitude: -47.0543,
    },
  },
];

// Mock News
export const mockNews: News[] = [
  {
    id: '1',
    title: 'Abertura oficial da AgroExpo 2025',
    content: 'A cerimônia de abertura contou com presença de autoridades locais e atraiu mais de 5 mil pessoas.',
    date: '2025-05-21',
    image: 'https://images.unsplash.com/photo-1534187886935-1e1fddcb352e?q=80&w=1470&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'Recordes de vendas no primeiro dia',
    content: 'Expositores relatam vendas 30% superiores em comparação com a edição anterior do evento.',
    date: '2025-05-21',
    image: 'https://images.unsplash.com/photo-1465126693214-3e2e58dc8942?q=80&w=1469&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'Previsão de chuva para amanhã',
    content: 'Organizadores prepararam áreas cobertas para garantir conforto aos visitantes mesmo em caso de chuva.',
    date: '2025-05-21',
    image: 'https://images.unsplash.com/photo-1513172128805-db680e8a4e91?q=80&w=1470&auto=format&fit=crop',
  },
  {
    id: '4',
    title: 'Nova tecnologia de irrigação apresentada',
    content: 'Sistema revolucionário promete economia de 40% de água na irrigação de grandes áreas.',
    date: '2025-05-22',
    image: 'https://images.unsplash.com/photo-1625301840055-d6e3dce3c35c?q=80&w=1470&auto=format&fit=crop',
  },
];
