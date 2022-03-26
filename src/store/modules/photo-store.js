import {photoService} from '@/services/photo.service.js';

export default {
  state: {
    photos: null,
    filterBy: null,
  },
  getters: {
    photos(state) {
      return state.photos;
    },
  },
  mutations: {
    setPhotos(state, {photos}) {
      state.photos = photos;
    },

    setFilterBy(state, {filterBy}) {
      state.filterBy = filterBy;
    },

    sortBy(state, {sortBy}) {
      var photos = JSON.parse(JSON.stringify(state.photos));
      if (!sortBy) state.photos = photos;
      else
        state.photos = photos.sort((a, b) => {
          let valA = a[sortBy];
          let valB = b[sortBy];
          if (sortBy === 'name') {
            valA = valA.toLowerCase();
            valB = valB.toLowerCase();
          }
          return valA > valB ? 1 : -1;
        });
    },

    removePhoto(state, {photoId}) {
      var photos = JSON.parse(JSON.stringify(state.photos));
      var photoIdx = photos.findIndex((photo) => photo._id === photoId);
      photos.splice(photoIdx, 1);
      state.photos = photos;
    },
    savePhoto(state, {photo}) {
      const idx = state.photos.findIndex(
        (currPhoto) => currPhoto._id === photo._id
      );
      if (idx !== -1) state.photos.splice(idx, 1, photo);
      else state.photos.push(photo);
    },
  },
  actions: {
    async loadPhotos(context) {
      try {
        var filterBy = context.state.filterBy ? context.state.filterBy : '';
        const photos = await photoService.getPhotos(filterBy);
        context.commit({type: 'setPhotos', photos});
        return photos; //check it dont need to return them
      } catch (err) {
        console.log(err);
      }
    },

    async getPhotoById(context, {photoId}) {
      try {
        return await photoService.getPhotoById(photoId);
      } catch (err) {
        console.log(err);
      }
    },

    getEmptyPhoto() {
      return photoService.getEmptyPhoto(); // maybe dont need to be here sync
    },
    async removePhoto(context, {photoId}) {
      try {
        await photoService.removePhoto(photoId);
        context.commit({type: 'removePhoto', photoId});
        return;
      } catch (err) {
        console.log(err);
      }
    },

    async savePhoto(context, {photo}) {
      try {
        // if (!context.state.photos) await context.dispatch({ type: 'loadPhotos' })
        // const isEdit = !!photo._id;
        const savedPhoto = await photoService.savePhoto(photo);
        context.commit({type: 'savePhoto', photo: savedPhoto});
      } catch (err) {
        console.log(err);
      }
    },

    // async addReview(context, { photoId, reviewTxt }) {
    //   const user = context.rootGetters.getUser;
    //   if (!user) return router.push('/login');
    //   const review = {
    //     txt: reviewTxt,
    //     miniUser: {
    //       id: user._id,
    //       username: user.username
    //     }
    //   }
    //   const updatedPhoto = await photoService.addReview(photoId, review)
    //   context.commit({ type: 'updatePhoto', photo: updatedPhoto })
    // }
  },
  modules: {},
};
