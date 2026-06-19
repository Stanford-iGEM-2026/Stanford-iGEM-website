export const TEAM_GROUPS = [
  {
    id: 'current',
    title: 'Current Team',
    members: [
      { name: 'Mariana Reyes', email: 'marianai@stanford.edu', image: '/Images/team/mariana_reyes.jpeg' },
      { name: 'Alvin Wong', email: 'alvinwfw@stanford.edu', image: '/Images/team/alvin_wong.jpeg' },
      { name: 'Canon Pham', email: 'cgpham@stanford.edu', image: '/Images/team/canon_pham.png' },
      { name: 'Clara Cestone', email: 'ccestone@stanford.edu', image: '/Images/team/clara_cestone.jpeg' },
      { name: 'Laura Adamkiewicz', email: 'ladamki@stanford.edu', image: '/Images/team/laura_adamkiewicz.jpeg' },
      { name: 'Grace Gao', email: 'gmxgao@stanford.edu', image: '/Images/team/grace_gao.jpeg' },
      { name: 'Augusta Rampe', email: 'arampe@stanford.edu', image: '/Images/team/augusta_rampe.jpeg' },
      { name: 'Hansen Tao', email: 'htao25@stanford.edu', image: '/Images/team/hansen_tao.jpeg' },
      { name: 'Katie Chen', email: 'kchen17@stanford.edu', image: '/Images/team/katie_chen.jpeg' },
      { name: 'Miranda Johnson', email: 'mljohns@stanford.edu', image: '/Images/team/miranda_johnson.jpeg' },
      { name: 'Kyle Roh', email: 'rohk@stanford.edu', image: '/Images/team/kyle_roh.jpeg' },
    ],
  },
  {
    id: 'vso',
    title: 'VSO Team',
    members: [
      { name: 'Alice Finkelstein', role: 'President', email: 'alicerf@stanford.edu', image: '/Images/team/alice_finkelstein.jpg' },
      { name: 'Ayushi Mohanty', role: 'Financial Officer', email: 'ngmurphy@stanford.edu', image: '/Images/team/ayushi_mohanty.jpg' },
      { name: 'Bernardo Melotti', role: 'Coordinator', email: 'bmelotti@stanford.edu', image: '/Images/team/bernardo_melotti.png' },
      { name: 'Amanuel Geremew', role: 'Coordinator', email: 'amanuelg@stanford.edu', image: '/Images/team/amanuel_geremew.jpg' },
      { name: 'Katherine Xu', role: 'Coordinator', email: 'kwx04@stanford.edu', image: '/Images/team/katherine_xu.png' },
      { name: 'Sabrina Olivares', role: 'Vice President', email: 'sabrinao@stanford.edu', image: '/Images/team/sabrina_olivares.png' },
      { name: 'Liz Tsai', role: 'Vice President', email: 'liztsaii@stanford.edu', image: '/Images/team/liz_tsai.jpeg' },
      { name: 'Noor El Kereamy', role: 'Coordinator', email: 'noorelk@stanford.edu', image: '/Images/team/noor_el_kereamy.png' },
      { name: 'Melwin Choon Lei Cheng', role: 'Coordinator', email: 'melwin@stanford.edu', image: '/Images/team/melwin_cheng.png' },
      { name: 'Rhea Rastogi', role: 'Coordinator', email: 'rhear@stanford.edu', image: '/Images/team/rhea_rastogi.png' },
      { name: 'Annabelle Shilling', role: 'Coordinator', email: 'agshilli@stanford.edu', image: '/Images/team/annabelle_shilling.png' },
    ],
  },
  {
    id: 'faculty',
    title: 'Faculty & Advisors',
    members: [
      { name: 'Dr. Chris Emig', role: 'Director', email: 'cemig@stanford.edu', image: '/Images/team/chirs.jpeg' },
      { name: 'Dr. Drew Endy', role: 'Primary PI', email: 'endy@stanford.edu', image: '/Images/team/endy.png' },
      { name: 'Dr. Alex Engel', role: 'Faculty Mentor', email: 'aengel@stanford.edu', image: '/Images/team/alex_engel.jpg' },
      { name: 'Dr. Sarah Klass', role: 'Faculty Mentor', email: 'klass@stanford.edu', image: '/Images/team/sarah_klass.jpeg' },
      { name: 'Dr. Phil Kyriakakis', role: 'Faculty Mentor', email: 'pky@stanford.edu', image: '/Images/team/phil.jpg' },
      { name: 'Cyrus K.', role: 'Mentor', email: 'cyrus.knudsen@stanford.edu', image: '/Images/team/cyrus.jpg' },
      { name: 'Samuel King', role: 'Mentor', email: 'samuelking@stanford.edu', image: '/Images/team/sam_king.jpg' },
    ],
  },
]

function getInitials(name) {
  return name
    .replace(/^Dr\.\s*/, '')
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export { getInitials }
