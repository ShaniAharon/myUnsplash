<template>
  <main class="top-header">
    <header class="header container-layout flex">
      <div class="flex">
        <i class="logo-cam fa-solid fa-camera"></i>
        <!-- <img class="logo" src="@/assets/my_unsplash_logo.svg" alt="" /> -->
        <photo-filter @setFilter="setFilter" />
        <span v-if="user">
          <!-- Hi {{ user.username }} -->
          <img
            @click="userPage"
            class="avatar"
            src="@/assets/portrait.png"
            alt=""
          />
        </span>
      </div>
      <ul class="links clean-list flex">
        <li>Explore</li>
        <li>Advertise</li>
        <li>Blog</li>
        <div class="line-container"><span class="vl"></span></div>
      </ul>
      <!-- <div class="btns-container flex"> -->
      <a v-if="!user" class="" @click="openLogin">Log in</a>
      <button v-if="user" class="logout btn-add" @click="logout">Logout</button>
      <button class="btn-submit" @click="openUpload">Submit a photo</button>
      <!-- <span class="hmb">&#9776;</span> -->
      <div class="sec-menu">
        <div @click="openMenu" class="hmb">
          <div></div>
        </div>
        <div v-if="isMenu" class="open-menu">
          <div class="menu-board">
            <div class="spike">
              <div class="trin"></div>
              <div class="sec-div-trin"></div>
            </div>
            <div class="content-container">
              <ul class="info-list clean-list">
                <li>test</li>
                <li>test</li>
                <li>test</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!-- <button class="btn-add" @click="openModal">Add photo</button> -->
      <!-- </div> -->
    </header>
    <div class="my-list-container container-layout">
      <ul class="my-list links clean-list flex">
        <li>
          <a class="a-link"><span>Editorial</span></a>
        </li>
        <div class="line-container"><span class="vl"></span></div>
        <li>
          <a class="a-link"><span>Act For Nature</span></a>
        </li>
        <li>
          <a class="a-link"><span>Color of Water</span> </a>
        </li>
      </ul>
    </div>
  </main>
  <!-- login -->
  <login @close="closeLogin" v-if="isLogin" />
  <!-- <img-uplaod /> -->
  <img-upload @closeM="closeUpload" v-if="isUpload" />
  <!-- photo details -->
  <photo-details
    @closeDetails="closeDetails"
    :photoId="currPhotoId"
    v-if="isDetails"
  />
  <div class="hero">
    <img class="hero-img" src="@/assets/hero-of-day.avif" alt="" />
    <!-- <div class="hero-inner">
    </div> -->
    <div class="text-in">
      <h1 class="title">Unflash</h1>
      <p>
        The internet’s source of freely-usable images.<br />
        Powered by creators everywhere.
      </p>
      <input
        type="text"
        class="input-search-main"
        placeholder="Search free high-resolution photos"
      />
    </div>
  </div>
  <section class="container-center">
    <photo-list
      @removed="removePhoto"
      @showDetails="showDetails"
      v-if="photos"
      :photos="photos"
    />
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
  import photoDetails from '../views/photo-details.vue';
  import photoFilter from '../cmps/photo-filter.vue';
  import {socketService} from '@/services/socket.service';

  export default {
    name: 'PhotoApp',
    components: {
      photoList,
      photoEdit,
      photoFilter,
      PhotoFilter,
      imgUpload,
      login,
      photoDetails,
    },
    data() {
      return {
        photoToEdit: photoService.getEmptyPhoto(),
        isShow: false,
        isLogin: false,
        isUpload: false,
        isDetails: false,
        isMenu: false,
        currPhotoId: '',
      };
    },
    created() {
      socketService.on('test addMsg', this.showMsg);
      socketService.on('delete photo', this.deletePhoto);
      socketService.on('add photo', this.addPhoto);
    },
    methods: {
      showDetails(photoId) {
        console.log('im here');
        this.currPhotoId = photoId;
        this.isDetails = true;
      },
      userPage() {
        this.$router.push('/user');
      },
      showMsg(msg) {
        console.log('got the msg', msg);
      },
      deletePhoto(imgId) {
        console.log('im removing', imgId);
        this.$store.commit({type: 'removePhoto', id: imgId});
      },
      addPhoto(photo) {
        console.log('im adding', photo);
        this.$store.commit({type: 'savePhoto', photo});
      },
      closeDetails() {
        console.log('im close details');
        this.isDetails = false;
      },
      openLogin() {
        this.isLogin = true;
      },
      openMenu() {
        this.isMenu = !this.isMenu;
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
      logout() {
        this.$store.dispatch({type: 'logout'});
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
