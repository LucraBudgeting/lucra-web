const pokemonBase = 'pokemon';
const authBase = 'auth';
export const healthBase = 'health';

export const pokemonRoutes = {
  base: pokemonBase,
};
export const authRoutes = {
  base: authBase,
  login: `/${authBase}/login`,
  register: `/${authBase}/register`,
};

export const homeRoute = '/' + pokemonBase;
export const noAuthHomeRoute = '/' + authRoutes.base;
export const desktopNoAuthHomeRoute = '/' + authRoutes.base;
