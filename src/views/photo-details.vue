<template>
  <div v-if="isShow && photo" @click="closeModal" class="modal">
    <!-- <h1 class="align-center">Photo Details</h1> -->
    <form @submit.prevent class="form-details">
      <h1>{{ photo?.label }} photo details</h1>
      <div class="img-container">
        <img class="details-img" v-if="photo" :src="showPhoto" alt="" />
      </div>
      <!-- <div class="flex btns-container">
        <button class="btn btn-cancel" @click="closeModal">Cancel</button>
        <button class="btn-red" @click="removePhoto">Delete</button>
      </div> -->
    </form>
  </div>
</template>

<script>
  // import {photoService} from '../services/photo.service.js';

  export default {
    name: 'PhotoDetails',
    props: {
      photoId: String,
    },
    components: {},
    data() {
      return {
        photo: null,
        isShow: true,
      };
    },
    created() {
      console.log('created', this.photoId);
      this.loadPhoto(); // opt1 , opt2 is to use the watch for the photo load
    },
    methods: {
      async loadPhoto() {
        if (!this.photoId) return; // prevent the run of the watcher when change route
        const photo = await this.$store.dispatch({
          type: 'getPhotoById',
          photoId: this.photoId,
        });
        this.photo = photo;
        this.isShow = true;
      },
      closeModal() {
        // this.isShow = false;
        this.$emit('closeDetails');
      },
    },
    computed: {
      //opt 2 use computed for the photoId
      // photoId() {
      //   return this.photoId;
      // },
      showPhoto() {
        console.log(this.photo);
        return this.photo.imgUrl;
      },
    },
    //opt1 use the param specf as the func
    //   watch: {
    //     '$route.params.photoId'(id) {
    //       console.log('Changed to', id);
    //       this.loadPhoto();
    //     },
    //   },
    //opt 2
    // watch: {
    //   // when the computed photoId run the watch handler also run
    //   photoId: {
    //     handler() {
    //       this.loadPhoto();
    //     },
    //     immediate: true, //to also run the watch on the start / run eagerly
    //   },
    // },
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
