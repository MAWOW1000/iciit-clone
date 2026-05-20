export const htmlFileToRoute = {
  'index.html': '/',
  'cfp.html': '/cfp',
  'com.html': '/com',
  'contact.html': '/contact',
  'date.html': '/date',
  'history.html': '/history',
  'iciit2018.html': '/iciit2018',
  'iciit2019.html': '/iciit2019',
  'iciit2020.html': '/iciit2020',
  'iciit2021.html': '/iciit2021',
  'iciit2022.html': '/iciit2022',
  'iciit2023.html': '/iciit2023',
  'iciit2024.html': '/iciit2024',
  'iciit2025.html': '/iciit2025',
  'invited.html': '/invited',
  'keynote.html': '/keynote',
  'pasts.html': '/pasts',
  'PI.html': '/PI',
  'prog.html': '/prog',
  'reg.html': '/reg',
  'sponsor.html': '/sponsor',
  'ssession.html': '/ssession',
  'sub.html': '/sub',
  'venue.html': '/venue',
  'visit.html': '/visit',
};

export function normalizeAssetLinks(html) {
  return html
    .replace(/\b(src)=["'](?!https?:|mailto:|tel:|\/|#)([^"']+)["']/gi, '$1="/site/$2"')
    .replace(/\b(href)=["'](?!https?:|mailto:|tel:|\/|#)([^"']+)["']/gi, (match, attr, href) => {
      const [pathPart, hashPart = ''] = href.split('#');
      const file = pathPart.split('/').pop();
      const route = htmlFileToRoute[file];
      if (route) {
        return `${attr}="${route}${hashPart ? `#${hashPart}` : ''}"`;
      }
      return `${attr}="/site/${href}"`;
    });
}
