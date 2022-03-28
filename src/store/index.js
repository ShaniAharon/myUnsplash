import {createStore} from 'vuex';
import photoStore from './modules/photo-store.js';
import userStore from './modules/user-store.js';

const store = createStore({
  strict: true,
  modules: {
    photoStore,
    userStore,
  },
});

export default store;
