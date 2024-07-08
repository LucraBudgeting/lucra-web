class envhelper {
  currentEnv = import.meta.env.VITE_ENV;
  isProd = import.meta.env.VITE_IS_PRODUCTION == 'true';

  isDev = this.currentEnv !== 'PROD';
}

export default envhelper;
export const envHelper = new envhelper();
