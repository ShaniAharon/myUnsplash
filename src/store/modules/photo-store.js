import {photoService} from '../../services/photo.service.js';
import {socketService} from '../../services/socket.service.js';
export default {
  state: {
    photos: null,
    filterBy: null,
    isLoading: false,
    // msgs: []
  },
  getters: {
    photos(state) {
      return state.photos;
    },
    getLabels(state) {
      return state.labels;
    },
    isLoading(state) {
      return state.isLoading;
    },
  },
  mutations: {
    setPhotos(state, {photos}) {
      state.photos = photos;
    },
    setIsLoading(state, {isLoading}) {
      state.isLoading = isLoading;
    },
    removePhoto(state, {id}) {
      const idx = state.photos.findIndex((photo) => photo._id === id);
      state.photos.splice(idx, 1);
    },
    savePhoto(state, {photo}) {
      const idx = state.photos.findIndex(
        (currPhoto) => currPhoto._id === photo._id
      );
      if (idx !== -1) state.photos.splice(idx, 1, photo);
      else state.photos.unshift(photo);
    },
    setFilter(state, {filterBy}) {
      state.filterBy = filterBy;
    },
  },
  actions: {
    async loadPhotos({commit, state}) {
      // commit({type: 'setIsLoading', isLoading: true});
      try {
        var photos = await photoService.query(state.filterBy);
        console.log('photos', photos);
        commit({type: 'setPhotos', photos});
      } catch (err) {
        console.error('Cannot Load photos', err);
        throw err;
      }
      // finally {
      //   commit({type: 'setIsLoading', isLoading: false});
      // }
    },
    async removePhoto({commit}, {id}) {
      try {
        await photoService.remove(id);
        commit({type: 'removePhoto', id});
      } catch (err) {
        console.error('Cannot remove photo', err);
        throw err;
      }
    },
    async getToyById(context, {photoId}) {
      try {
        return await photoService.getToyById(photoId);
      } catch (err) {
        console.log(err);
      }
    },
    async savePhoto({commit}, {photo}) {
      try {
        const msgTxt = photo._id ? 'Photo updated' : 'Photo added';
        var photo = await photoService.save(photo);
        socketService.emit('msg watched users', msgTxt);
        commit({type: 'savePhoto', photo});
      } catch (err) {
        console.error('Cannot Edit/Add photo', err);
        throw err;
      }
    },
    filter({commit, dispatch}, {filterBy}) {
      commit({type: 'setFilter', filterBy});
      dispatch({type: 'loadPhotos'});
    },
  },
};
