export const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Call for Papers', href: '/cfp' },
  { label: 'Committee', href: '/com' },
  {
    label: 'Speakers',
    href: '/keynote',
    children: [
      { label: 'Keynote Speakers', href: '/keynote' },
      { label: 'Invited Speakers', href: '/invited' },
      { label: 'Previous Speakers', href: '/pasts' },
    ],
  },
  {
    label: 'Program',
    href: '/prog',
    children: [
      { label: 'Conference Program', href: '/prog' },
      { label: 'Important Dates', href: '/date' },
    ],
  },
  {
    label: 'Authors',
    href: '/sub',
    children: [
      { label: 'Paper Submission', href: '/sub' },
      { label: 'Presentation Instruction', href: '/PI' },
    ],
  },
  {
    label: 'Registration',
    href: '/reg',
    children: [
      { label: 'Registration', href: '/reg' },
      { label: 'Sponsor', href: '/sponsor' },
    ],
  },
  {
    label: 'History',
    href: '/history',
    children: [
      { label: 'About ICIIT 2025', href: '/iciit2025' },
      { label: 'About ICIIT 2024', href: '/iciit2024' },
      { label: 'About ICIIT 2023', href: '/iciit2023' },
      { label: 'About ICIIT 2022', href: '/iciit2022' },
      { label: 'About ICIIT 2021', href: '/iciit2021' },
      { label: 'About ICIIT 2020', href: '/iciit2020' },
      { label: 'About ICIIT 2019', href: '/iciit2019' },
      { label: 'About ICIIT 2018', href: '/iciit2018' },
    ],
  },
  {
    label: 'Local Information',
    href: '/venue',
    children: [
      { label: 'Conference Venue', href: '/venue' },
      { label: 'Visit and Visa', href: '/visit' },
    ],
  },
  { label: 'Contact', href: '/contact' },
];
