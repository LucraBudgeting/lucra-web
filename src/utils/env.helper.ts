class envhelper {
  currentEnv = import.meta.env.VITE_ENV;
  isProd = import.meta.env.VITE_IS_PRODUCTION == 'true' || this.currentEnv === 'PROD';
  isDev = this.currentEnv !== 'PROD';
  isLocal = this.currentEnv?.toLowerCase() === 'local';
}

export default envhelper;
export const envHelper = new envhelper();
