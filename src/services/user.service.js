import {httpService} from './http.service.js';

const ENDPOINT = 'auth';
const LOGGEDIN_USER_KEY = 'loggedinUser';

async function login(cred) {
  const user = await httpService.post(ENDPOINT + '/login', cred);
  if (user) return _saveLocalUser(user);
}
async function signup(cred) {
  const user = await httpService.post(ENDPOINT + '/signup', cred);
  return _saveLocalUser(user);
}

async function logout() {
  sessionStorage.removeItem(LOGGEDIN_USER_KEY);
  return await httpService.post(ENDPOINT + '/logout');
}

export const userService = {
  login,
  signup,
  logout,
  getLoggedinUser,
};

function _saveLocalUser(user) {
  sessionStorage.setItem(LOGGEDIN_USER_KEY, JSON.stringify(user));
  return Promise.resolve(user);
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem(LOGGEDIN_USER_KEY) || 'null');
}
