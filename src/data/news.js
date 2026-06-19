export const NEWS_ITEMS = [
  {
    date: '2024-07-02',
    title:
      '2024 iGEM Team presents SB (Synthetic Biology) Talk @ Shriram Tea Room about Project Dux, a treatment for FSHD',
    image: '/Images/news/7-2-2024.png',
    imageAlt: '2024 iGEM team presenting a synthetic biology talk about Project Dux',
  },
  {
    date: '2024-05-10',
    title: 'Leadership from iGEM Headquarters visits Stanford iGEM!',
    image: '/Images/news/5-10-2024.png',
    imageAlt: 'iGEM Headquarters leadership visiting Stanford iGEM',
  },
  {
    date: '2024-04-28',
    title:
      'Bay Area Collab! Stanford iGEM goes to the first ever Bay Area Bioengineering Symposium (BABS) @ UC Berkeley',
    image: '/Images/news/4-28-2024.png',
    imageAlt: 'Stanford iGEM at the Bay Area Bioengineering Symposium',
  },
  {
    date: '2023-11-05',
    title:
      'Stanford iGEM nominated for Best Environmental Project and Education Special Prize at 2023 Jamboree',
    image: '/Images/news/11-5-2023.jpg',
    imageAlt: 'Julia and Nick at the 2023 iGEM Jamboree',
  },
  {
    date: '2023-10-25',
    title:
      'Phil\'s Laberia was featured in Stanford Bioengineering News for being a "game changer in bioengineering education"',
    image: '/Images/news/10-25-2023.png',
    imageAlt: 'Phil\'s Laberia featured in Stanford Bioengineering News',
  },
  {
    date: '2023-07-22',
    title:
      '2023 iGEM Team collaborate with Society of Women Engineers to host a synthetic biology workshop',
    image: '/Images/news/7-22-2023.jpg',
    imageAlt: '2023 iGEM team synthetic biology workshop with SWE',
  },
  {
    date: '2023-06-25',
    title:
      '2023 iGEM Team presents SB (Synthetic Biology) Talk about ARC phage engineering initiatives',
    image: '/Images/news/6-25-2023.jpg',
    imageAlt: '2023 iGEM team presenting on ARC phage engineering',
  },
  {
    date: '2022-08-26',
    title: '2022 iGEM Team presents at Stanford Bio-X Poster Presentation',
    image: '/Images/news/8-26-2022.jpg',
    imageAlt: '2022 iGEM team at Stanford Bio-X poster presentation',
  },
]

export function formatNewsDate(isoDate) {
  const [year, month, day] = isoDate.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}
