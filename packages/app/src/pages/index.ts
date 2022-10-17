export type HistoryAction = 'push' | 'replace';
export type Page = "Root" | "Create" | "Login" | "Logout";
export type Route = Record<Page, string>;
export type Option = Record<Page, string[] | boolean>;

export interface Props {
  page: Page,
  pathname: string
}

const _route: Route = {
  Root: '/',
  Create: '/create',
  Login: '/login',
  Logout: '/logout'
}

const _allowedSearch: Record<Page, string[]> = {
  Root: [],
  Create: [],
  Login: ['?signup'],
  Logout: []
}

const _menuSideAccess: Record<Page, boolean> = {
  Root: true,
  Create: false,
  Login: false,
  Logout:false 
}

export const toPathname: (page: Page) => string = (page) => _route[page];

const _toPage: (pathname: string) => Page = (pathname) => 
  <Page>Object.entries(_route).find(([, path]) => path === pathname)?.[0];

export const toPage = _toPage;

export const assertAllowedSearch: (pathname: string, search: string) => boolean = (pathname, search) =>
  _allowedSearch[_toPage(pathname)]?.includes(search); 

export const isMenuSideAccessible: (page: Page) => boolean = page => _menuSideAccess[page]
