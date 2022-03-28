<template>
  <main class="">
    <header class="header container-layout flex">
      <div class="flex">
        <img class="logo" src="@/assets/my_unsplash_logo.svg" alt="" />
        <photo-filter @setFilter="setFilter" />
        <span v-if="user"> Hi {{ user.username }}</span>
      </div>
      <button class="btn-add" @click="openLogin">Login</button>
      <button class="btn-add" @click="openUpload">Upload</button>
      <button class="btn-add" @click="openModal">Add photo</button>
    </header>
  </main>
  <login @close="closeLogin" v-if="isLogin" />
  <!-- <img-uplaod /> -->
  <img-upload @closeM="closeUpload" v-if="isUpload" />

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
  import imgUpload from '@/cmps/img-upload.vue';
  import {photoService} from '../services/photo.service.js';
  import photoEdit from '../views/photo-edit.vue';
  import login from '../views/login-page.vue';
  import photoFilter from '../cmps/photo-filter.vue';

  export default {
    name: 'PhotoApp',
    components: {
      photoList,
      photoEdit,
      photoFilter,
      PhotoFilter,
      imgUpload,
      login,
    },
    data() {
      return {
        // photos: null,
        photoToEdit: photoService.getEmptyPhoto(),
        isShow: false,
        isLogin: false,
        isUpload: false,
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
      openLogin() {
        this.isLogin = true;
      },
      closeLogin() {
        this.isLogin = false;
      },
      openModal() {
        this.isShow = true;
      },
      closeModal() {
        this.isShow = false;
      },
      openUpload() {
        this.isUpload = true;
      },
      closeUpload() {
        this.isUpload = false;
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
      user() {
        return this.$store.getters.getUser;
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
