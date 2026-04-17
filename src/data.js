// ============================================================
// DONNÉES COMPLÈTES DU SITE SHIBUYA ZUDO WEALTH
// ============================================================

// Rôles et leurs permissions directes
export const ROLES = [
  {
    id: 2, name: 'Co-owner', emoji: '🔑', perm: 1, price: 15,
    color: '#6366f1', permColor: 'var(--perm-1)',
    requiresMin: null,
    directCmds: ['+snipe', '-tempmute', '-warn', '-unmute'],
    directPerms: [],
    note: null,
  },
  {
    id: 3, name: 'Owner', emoji: '👑', perm: 2, price: 25,
    color: '#8b5cf6', permColor: 'var(--perm-2)',
    requiresMin: null,
    directCmds: ['=find', '+vc', '+stats', '+member', '+user'],
    directPerms: ['Gérer les messages (discussion)'],
    note: null,
  },
  {
    id: 4, name: '💎 Diamant', emoji: '💎', perm: 3, price: 50,
    color: '#a855f7', permColor: 'var(--perm-3)',
    requiresMin: 'Owner requis',
    directCmds: ['+ban (jugement)', '+pic', '=mv', '-delsanction'],
    directPerms: ['Gérer les pseudos', '/rank /derank /rankup (Perm I → Perm III)'],
    note: null,
  },
  {
    id: 5, name: '💷 Billet', emoji: '💷', perm: 3, price: 100,
    color: '#a855f7', permColor: 'var(--perm-3)',
    requiresMin: null,
    directCmds: [],
    directPerms: ['Mute clic droit'],
    note: null,
  },
  {
    id: 6, name: '🔆 Soleil', emoji: '🔆', perm: 4, price: 160,
    color: '#ec4899', permColor: 'var(--perm-4)',
    requiresMin: null,
    directCmds: ['+serverinfo', '+vocinfo', '+channel [salon]'],
    directPerms: ['Move & Déco clic droit (vc public)', '/rank /derank /rankup (Perm III → Perm IV)'],
    note: null,
  },
  {
    id: 7, name: '☘️ Trèfle', emoji: '☘️', perm: 5, price: 230,
    color: '#06b6d4', permColor: 'var(--perm-5)',
    requiresMin: null,
    directCmds: ['-derank (raison)'],
    directPerms: ['80% accès backup serveur (mod, msg, vc)', 'Logs serveur intégrées', 'Invitation et accès serveur logs'],
    note: null,
  },
  {
    id: 8, name: '❄️ Flocon', emoji: '❄️', perm: 5, price: 300,
    color: '#06b6d4', permColor: 'var(--perm-5)',
    requiresMin: null,
    directCmds: ['/to', '/unto'],
    directPerms: [],
    note: null,
  },
  {
    id: 9, name: '🫧 Bulle', emoji: '🫧', perm: 5, price: 400,
    color: '#06b6d4', permColor: 'var(--perm-5)',
    requiresMin: null,
    directCmds: ['/addrole', '/delrole'],
    directPerms: ['TO clic droit'],
    note: null,
  },
  {
    id: 11, name: 'ROYAL', emoji: '👸', perm: 6, price: 550,
    color: '#f59e0b', permColor: 'var(--perm-6)',
    requiresMin: null,
    directCmds: ['+ban (immédiat)', '=join', '-unmuteall'],
    directPerms: ['Bypass salon sanction', 'Bypass salon jugement', 'Bypass raison -derank'],
    note: null,
  },
  {
    id: 12, name: 'CROWN', emoji: '🏅', perm: 6, price: 800,
    color: '#f59e0b', permColor: 'var(--perm-6)',
    requiresMin: 'CROWN minimum',
    directCmds: [],
    directPerms: ['PERM ROLE', 'PERM IMAGE', 'Perms clic droit House Voice'],
    note: null,
  },
  {
    id: 13, name: 'ADMIN', emoji: '🛡️', perm: 7, price: 1200,
    color: '#ef4444', permColor: 'var(--perm-7)',
    requiresMin: 'Owner requis',
    directCmds: ['&clear', '-mutelist'],
    directPerms: ['Full accès backup serveur', 'Full accès serveur logs', 'WL GESTION : /blr /unblr /blr-user'],
    note: null,
  },
  {
    id: 14, name: 'BOT = BOT', emoji: '🤖', perm: 8, price: 1800,
    color: '#10b981', permColor: 'var(--perm-8)',
    requiresMin: null,
    directCmds: ['+lock', '+slowmode', '+create', '+badword add/delete/list', '/jail (only BLR)'],
    directPerms: ['Gérant serveur', 'WL clic droit (to, mute, move, deco, rename)'],
    note: null,
  },
  {
    id: 15, name: 'Rôle Invisible', emoji: '👁️', perm: 8, price: 2500,
    color: '#10b981', permColor: 'var(--perm-8)',
    requiresMin: 'CROWN minimum',
    directCmds: [],
    directPerms: ['WL ADMIN (+ban, -derank, to)', '&BL MASTER'],
    note: 'Rôle de prestige',
  },
  {
    id: 16, name: 'Couronne', emoji: '💍', perm: 9, price: 3500,
    color: '#f472b6', permColor: 'var(--perm-9)',
    requiresMin: null,
    directCmds: ['+giveaway', '+allbots'],
    directPerms: ['PERM SALON', 'BAN CLIC DROIT'],
    note: null,
  },
  {
    id: 17, name: 'Créateur', emoji: '✨', perm: 10, price: 5500,
    color: '#fbbf24', permColor: 'var(--perm-10)',
    requiresMin: null,
    directCmds: ['&renew', '/lockname'],
    directPerms: ['PERM ADMIN', '&BL SYS', '&DERANK SYS'],
    note: 'Accès total — Niveau ultime',
  },
];

// Calcul des permissions cumulées pour un rôle donné
export const getCumulativePerms = (roleId) => {
  const role = ROLES.find(r => r.id === roleId);
  if (!role) return { cmds: [], perms: [], total: 0 };

  const eligible = ROLES.filter(r => r.id <= roleId && r.perm <= role.perm);

  const allCmds = [...new Set(eligible.flatMap(r => r.directCmds))];
  const allPerms = [...new Set(eligible.flatMap(r => r.directPerms))];

  return {
    cmds: allCmds,
    perms: allPerms,
    total: allCmds.length + allPerms.length,
  };
};

// Sections de rôles pour la page Roles
export const ROLE_SECTIONS = [
  {
    id: 'depart',
    icon: '🌸',
    title: 'Rôles de Départ',
    desc: "Les rôles d'entrée sur le serveur — permissions de base et introduction à la hiérarchie.",
    roleIds: [2, 3],
  },
  {
    id: 'moderation',
    icon: '⚔️',
    title: 'Modération Standard',
    desc: "Rôles de modération active — gestion des membres, tickets et sanctions.",
    roleIds: [4, 5, 6],
  },
  {
    id: 'elite',
    icon: '❄️',
    title: 'Modération Élite',
    desc: "Accès étendu au backup serveur, logs intégrées et contrôle avancé.",
    roleIds: [7, 8, 9],
  },
  {
    id: 'premium',
    icon: '👸',
    title: 'Rôles Premium',
    desc: "Rôles de prestige avec bypass et permissions House Voice.",
    roleIds: [11, 12],
  },
  {
    id: 'haute',
    icon: '🔱',
    title: 'Haute Administration',
    desc: "Administration complète du serveur, gestion WL et BL.",
    roleIds: [13, 14, 15],
  },
  {
    id: 'apex',
    icon: '✨',
    title: 'Apex — Niveau Maximum',
    desc: "Les rôles les plus puissants du serveur. Accès total et contrôle absolu.",
    roleIds: [16, 17],
  },
];

// Whitelist & Abonnements (inspiré des screenshots)
export const WL_SECTIONS = [
  {
    id: 'fabulous_pack',
    icon: '✨',
    title: 'Fabulous Pack',
    desc: "Actions directes et version système (niveau supérieur).",
    cards: [
      {
        name: 'OWNER FABULOUS', req: null,
        desc: "Pack d'action pour dog-add, wakeup, snap et typeu.",
        features: [
          '/dog-add - met la cible en laisse (blocage pseudo en vocal public)',
          '/wakeup - réveil + spam mp pour attirer l\'attention',
          '/snap - spam mp pour obtenir un snap',
          '/tipeu - rename en Z et lock du pseudo cible',
          '⚠️ Usage responsable requis, évite le harcèlement.',
        ],
        price: '125 $',
      },
      {
        name: 'SYS FABULOUS', req: 'Owner requis',
        desc: "Version système avec suppression des laisses/fistons/typeus.",
        features: [
          '/fiston - rename Z (rename=ban), si la cible rename elle est ban',
        ],
        price: '325 $',
      },
    ],
  },
  {
    id: 'controle_vocal',
    icon: '🎙️',
    title: 'Contrôle Vocal',
    desc: "Gestion des vocaux privés, mouvement et modération voice.",
    cards: [
      {
        name: 'PACK WL VOCAL', req: null,
        desc: "Mute clic droit, move et déco WL.",
        features: [],
        price: '150 $',
      },
      {
        name: 'OWNER VOICEMASTER', req: null,
        desc: "Privatise un vocal et gère les accès.",
        features: [
          '=pv - rend un vocal privé ou le repasse public',
          '=acces - donne accès à un membre dans un vocal privé',
          '=all - donne accès à tous les membres déjà présents',
          '=mv - upgrade commande pour accès vocal privé et pv',
          '=mp - permet de DM un membre',
          '=join - rejoint certains vocaux pv (catégorie privée)',
          '=wl - donne la WL à quelqu\'un ou affiche la WL',
          '=pvlist - affiche la liste des salons pv',
        ],
        price: '200 $',
      },
      {
        name: 'SYS VOICEMASTER', req: 'Owner requis',
        desc: "Domine les vocaux : menotte, follow, move global.",
        features: [
          '=menotte - menotte quelqu\'un (1 max)',
          '=wlmv - autorise un user à te mv',
          '=vmall - move tout le salon vers un vocal cible',
          '=follow - permet de suivre quelqu\'un',
        ],
        price: '300 $',
      },
      {
        name: 'VOCAL PERSO', req: '@CROWN minimum',
        desc: "Salon vocal perso éditable (nom + permissions).",
        features: [],
        price: '150 $ + 30 $ / mois',
      },
    ],
  },
  {
    id: 'gestion_roles',
    icon: '🎭',
    title: 'Gestion Rôles',
    desc: "Ajout de rôles et gestion des rangs selon niveau d'accès.",
    cards: [
      {
        name: 'WL ROLE', req: '@CROWN minimum',
        desc: "Ajoute des perms sans limite BOT PROTECT.",
        features: [
          '✦ Rôles ajoutables :',
          '⭐⭐',
          'co-owner',
          'gestions',
          '+pic',
          'og friend',
        ],
        price: '150 $',
      },
      {
        name: 'OWNER ROLE', req: 'WL requis',
        desc: "Ajout de rôles owner et rôles persos fonda.",
        features: [
          '✦ Rôles ajoutables :',
          'owner',
          '⚒️',
          '💷',
          '🔆',
          'Roles Perso des C.E.O.',
        ],
        price: '200 $',
      },
      {
        name: 'SYS ROLE', req: 'Owner requis',
        desc: "Version système pour palette complète de rôles.",
        features: [
          '✦ Rôles ajoutables :',
          '☘',
          '❄️',
          '🫧',
          'TOUCHE = BL',
        ],
        price: '250 $',
      },
      {
        name: 'ROLE PERSO', req: '@CROWN minimum',
        desc: "Personnalise nom, badge et couleur du rôle.",
        features: [],
        price: '150 $ + 30 $ / mois',
      },
    ],
  },
  {
    id: 'moderation_justice',
    icon: '⚖️',
    title: 'Modération & Justice',
    desc: "Actions sensibles : BLR, blacklist, unbanall et contrôle staff.",
    cards: [
      {
        name: 'OWNER GESTION', req: null,
        desc: "BLR un staff en abus avec /blr.",
        features: [
          '/blr - retire temporairement le rank staff cible',
          '/unblr - gracie et restaure l\'accès si nécessaire',
        ],
        price: '150 $',
      },
      {
        name: 'ROLE GARDIEN (BENDO)', req: null,
        desc: "Deviens gardien et impose ton autorité sur la prison virtuelle.",
        features: [
          'TO clic droit - timeout rapide sur cible',
          'mute clic droit - mute immédiat en un clic',
          '+tempmute - mute temporaire personnalisé',
          'accès tickets ban/bl - gestion des tickets sanctions',
          'gérer les messages - modérer les discussions',
          'gérer les pseudos - renommer et gérer les pseudos',
          '⚠️ Perm orientée modération sévère, à utiliser avec contrôle.',
        ],
        price: '100 $',
      },
      {
        name: 'SYS GESTION', req: 'Owner requis',
        desc: "BLR ultime et commandes de suivi owner.",
        features: [
          '.ow - owner tools/listing et derank en cas d\'abus',
        ],
        price: '200 $',
      },
      {
        name: 'PERM BLACKLIST', req: null,
        desc: "Blacklist serveur avec unban réservé owner.",
        features: [
          '&unbl - seul un owner peut déban une cible blacklist',
          '⚠️ Perm très puissante, à utiliser avec retenue.',
        ],
        price: '225 $',
      },
      {
        name: 'SYS JUGE', req: null,
        price: '600 $',
      },
    ],
  },
];

// Abonnements
export const SUBSCRIPTIONS = [
  {
    id: 'silver', tier: 'ENTRY', name: 'SILVER INVEST', 
    price: '14,99', oldPrice: '19,99€', discount: '-25%', colorClass: 'silver',
    image: '/badges/silver.png',
    featured: false,
    label: 'ABONNEMENT MENSUEL',
    avantages: [
      'Flex UHQ',
      'Giveaway journalier +',
      'Role @Acces 👑 (chat-owner, vocaux owner, reunions owner)',
      'WL clic droit +1 (TO/MUTE/MOVE)',
    ],
    cmds: ['/aide', '/rerank (2/jour)', '/gift (1/jour)'],
  },
  {
    id: 'gold', tier: 'STANDARD+', name: 'GOLD INVEST', 
    price: '29,99', oldPrice: '39,99€', discount: '-25%', colorClass: 'gold',
    image: '/badges/gold.png',
    featured: true,
    label: 'ABONNEMENT MENSUEL',
    avantages: [
      'WL clic droit +2 (TO/MUTE/MOVE)',
      'Flex UHQ',
      'Giveaway journalier +',
      'Role @Acces 👑 (chat-owner, vocaux owner, reunions owner)',
    ],
    cmds: ['/affichage', '/rerank (2/jour)', '/gift (2/jour)', '/aide'],
  },
  {
    id: 'platinum', tier: 'CORE', name: 'PLATINUM INVEST', 
    price: '44,99', oldPrice: '59,99€', discount: '-25%', colorClass: 'platinum',
    image: '/badges/plat.png',
    featured: false,
    label: 'ABONNEMENT MENSUEL',
    avantages: [
      'Couleur degradee role perso (3 predefinis)',
      'Owner Fabulous BOT',
      'Limite augmentee +1 (dog-add)',
      'WL clic droit +3 (TO/MUTE/MOVE)',
      'Flex UHQ',
      'Giveaway journalier +',
      'Role @Acces 👑 (chat-owner, vocaux owner, reunions owner)',
    ],
    cmds: ['/protect-role', '/gift (2/jour)', '/rerank (2/jour)', '/affichage', '/aide'],
  },
  {
    id: 'diamond', tier: 'ROYAL+', name: 'DIAMOND INVEST', 
    price: '74,99', oldPrice: '99,99€', discount: '-25%', colorClass: 'diamond',
    image: '/badges/diams.png',
    featured: false,
    label: 'ABONNEMENT MENSUEL',
    avantages: [
      'Appel exclusif (voc 5 min avec les fondateurs)',
      'Upgrade role perso au dessus de Legende',
      'WL +ban limite x2 (30 min)',
      'Couleur degradee role perso (5 predefinis)',
      'WL clic droit +6 (TO/MUTE/MOVE)',
      'Flex UHQ',
      'Limite augmentee +2 (dog-add)',
      'Role @Acces 👑 (chat-owner, vocaux owner, reunions owner)',
    ],
    cmds: ['/protect-salon', '/rerank', '/gift (3/jour)', '/protect-role', '/affichage', '/aide'],
  },
  {
    id: 'ruby', tier: 'RUBY', name: 'RUBY INVEST', 
    price: '149,99', oldPrice: '199,99€', discount: '-25%', colorClass: 'ruby',
    image: '/badges/ruby.png',
    featured: false,
    subtitle: '(LIMITED, CROWN+)',
    label: 'ABONNEMENT MENSUEL',
    avantages: [
      'Appel exclusif (voc 10 min avec les fondateurs)',
      'Upgrade role perso au dessus des Gestions',
      'Couleur degradee role perso',
      'WL clic droit +10 (TO/MUTE/MOVE)',
      'WL +ban limite x2 (30 min)',
      'Giveaway journalier +',
      'Flex UHQ (role deco superieur & holographique)',
      'Role @Acces 👑 (chat-owner, vocaux owner, reunions owner)',
    ],
    cmds: ['/gift (4/jour)', '/rerank (4/jour)', '/protect-salon', '/protect-role', '/affichage', '/aide'],
  },
  {
    id: 'opal', tier: 'OPAL', name: 'OPAL INVEST', 
    price: '299,99', oldPrice: '399,99€', discount: '-25%', colorClass: 'opal',
    image: '/badges/opal.png',
    featured: false,
    subtitle: '(LIMITED, BOT = BOT+)',
    label: 'ABONNEMENT MENSUEL',
    avantages: [
      'SYS Fabulous BOT + suppression des dogs/typeuse',
      'Appel exclusif (voc 15 min avec les fondateurs)',
      'Upgrade role perso au dessus de Ryu',
      'Couleur degradee role perso',
      'WL clic droit +12 (TO/MUTE/MOVE)',
      'WL +ban limite x2 (30 min)',
      'Giveaway journalier +',
      'Role @Acces 👑 (chat-owner, vocaux owner, reunions owner)',
    ],
    cmds: ['/wet', '/gift (5/jour)', '/rerank (5/jour)', '/protect-salon', '/protect-role', '/affichage', '/aide'],
  },
];
