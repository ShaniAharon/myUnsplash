<template>
  <main class="">
    <header class="header container-layout flex">
      <div class="flex">
        <img class="logo" src="@/assets/unsplash.png" alt="" />
        <photo-filter @setFilter="setFilter" />
      </div>
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
      <h4>Label</h4>
      <input
        type="text"
        placeholder="Your label here :)"
        v-model="photoToEdit.label"
        class=""
      />
      <h4>Photo URL</h4>
      <input
        type="text"
        placeholder="http://images.example.com/photo-12345234"
        v-model="photoToEdit.imgUrl"
        class=""
      />
      <div class="flex btns-container">
        <button class="btn btn-cancel" @click="closeModal">Cancel</button>
        <button class="btn-submit" @click="save">Submit</button>
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
          this.photoToEdit = photoService.getEmptyPhoto();
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
