<template>
  <main class="main-content">
    <header class="header flex">
      <div>
        <img src="@/assets/unsplash.png" alt="" />
      </div>
      <!-- <input type="text" class="input-search" placeholder="Search by name" /> -->
      <photo-filter @setFilter="setFilter" />
      <button class="btn-add" @click="openModal">Add photo</button>
    </header>
  </main>
  <section class="container-center">
    <photo-list @removed="removePhoto" v-if="photos" :photos="photos" />
  </section>
  <!-- can put the modal in is own cmp and render it here , also put the edit/save logic in there -->
  <div v-show="isShow" class="add-modal">
    <form @submit.prevent class="form-add">
      <h1>Add a new photo</h1>
      <h3>Label</h3>
      <input type="text" v-model="photoToEdit.label" class="input-big" />
      <h3>Photo URL</h3>
      <input type="text" v-model="photoToEdit.imgUrl" class="input-big" />
      <div class="flex">
        <button class="btn btn-black" @click="closeModal">Cancel</button>
        <button class="btn-add" @click="save">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
  import PhotoFilter from '../cmps/photo-filter.vue';
  import photoList from '../cmps/photo-list.cmp.vue';
  import {photoService} from '../services/photo.service.js';
  import photoEdit from '../views/photo-edit.vue';
  import photoFilter from '../cmps/photo-filter.vue';

  export default {
    name: 'PhotoApp',
    components: {
      photoList,
      photoEdit,
      photoFilter,
      PhotoFilter,
    },
    data() {
      return {
        // photos: null,
        photoToEdit: photoService.getEmptyPhoto(),
        isShow: false,
      };
    },
    created() {
      // this.loadPhotos();
    },
    methods: {
      // loadPhotos() {
      //   photoService.query({}).then((projs) => {
      //     console.log(projs);
      //     this.photos = projs;
      //   });
      // },
      openModal() {
        this.isShow = true;
      },
      closeModal() {
        this.isShow = false;
      },
      async save() {
        try {
          await this.$store.dispatch({
            type: 'savePhoto',
            photo: this.photoToEdit,
          });
          this.closeModal();
        } catch (err) {
          console.log(err);
        }
      },
      removePhoto(photoId) {
        this.$store.dispatch({type: 'removePhoto', id: photoId});
      },
      setFilter(filterBy) {
        this.$store.dispatch({type: 'filter', filterBy});
      },
    },
    computed: {
      // photosToShow() {
      //   return this.photos;
      // },
      photos() {
        return this.$store.getters.photos;
      },
    },
    unmounted() {},
  };
</script>

<style>
  .main-content {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    /* margin: 0 auto; */
  }
</style>
