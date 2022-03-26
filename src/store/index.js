import {createStore} from 'vuex';
import photoStore from './modules/photo-store.js';

const store = createStore({
  strict: true,
  modules: {
    photoStore,
  },
});

export default store;
