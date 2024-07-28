enum LocalKeys {
  ADMIN_USER_TOKEN = 'ADMIN_USER_TOKEN',
  CATEGORY_LIST = 'CATEGORY_LIST',
}

const setLocal = (key: LocalKeys | string, value: string) => {
  localStorage.setItem(key, value);
};

const removeLocal = (key: LocalKeys | string) => {
  localStorage.removeItem(key);
};

const clearAll = () => {
  localStorage.clear();
};

const clearButKeepAdminToken = () => {
  const adminToken = getLocal(LocalKeys.ADMIN_USER_TOKEN);
  localStorage.clear();
  setLocal(LocalKeys.ADMIN_USER_TOKEN, adminToken!);
};

const getLocal = (key: LocalKeys | string) => {
  return localStorage.getItem(key);
};

export { LocalKeys, setLocal, removeLocal, getLocal, clearAll, clearButKeepAdminToken };
