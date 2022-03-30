import {userService} from '@/services/user.service.js';
import {socketService} from '@/services/socket.service';

export default {
  state: {
    loggedinUser: userService.getLoggedinUser(), //need to save the user in session stoarge
  },
  getters: {
    getUser(state) {
      console.log('got user', state.loggedinUser);
      return state.loggedinUser;
    },
  },
  mutations: {
    setUser(state, {user}) {
      state.loggedinUser = user;
    },
  },
  actions: {
    async login({commit}, {cred}) {
      try {
        const user = await userService.login(cred);
        commit({type: 'setUser', user});
        socketService.emit('watch user', user._id);
      } catch (err) {
        console.log(err);
      }
    },
    async signup({commit}, {cred}) {
      try {
        const user = await userService.signup(cred);
        commit({type: 'setUser', user});
        return user;
      } catch (err) {
        console.log(err);
      }
    },
    async logout({commit}) {
      try {
        await userService.logout();
        commit({type: 'setUser', user: null});
      } catch (err) {
        console.log(err);
      }
    },
  },
};
