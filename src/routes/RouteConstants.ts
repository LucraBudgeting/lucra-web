const pokemonBase = 'pokemon';
const authBase = 'auth';
const bankBase = 'bank';
export const healthBase = 'health';

export const pokemonRoutes = {
  base: pokemonBase,
};
export const authRoutes = {
  base: authBase,
  login: `/${authBase}/login`,
  register: `/${authBase}/register`,
};

export const bankRoutes = {
  base: bankBase,
};

export const homeRoute = '/' + pokemonBase;
export const noAuthHomeRoute = '/' + authRoutes.base;
export const desktopNoAuthHomeRoute = '/' + authRoutes.base;
