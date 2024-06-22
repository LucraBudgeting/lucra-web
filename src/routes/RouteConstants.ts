const pokemonBase = 'pokemon';
const authBase = 'auth';
const bankBase = 'bank';
const dashboardBase = 'dashboard';
export const healthBase = 'health';

export const pokemonRoutes = {
  base: pokemonBase,
};

export const dashboardRoutes = {
  base: dashboardBase,
};

export const authRoutes = {
  base: authBase,
  login: `/${authBase}/login`,
  register: `/${authBase}/register`,
};

export const bankRoutes = {
  base: bankBase,
};

export const homeRoute = '/' + dashboardBase;
export const noAuthHomeRoute = '/' + authRoutes.base;
export const desktopNoAuthHomeRoute = '/' + authRoutes.base;
