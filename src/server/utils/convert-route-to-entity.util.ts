const mapping: Record<string, string> = {
  articles: 'article',
  businesses: 'business',
  'landing-pages': 'landing_page',
  renamedpackages: 'Renamedpackage',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
