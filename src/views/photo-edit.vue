<template>
  <section class="center form-center">
    <h1>{{ formTitle }}</h1>
    <form @submit.prevent="save">
      <div class="inputbox">
        <input type="text" v-model="photoToEdit.name" placeholder="title" />
      </div>
      <div class="inputbox">
        <input
          class=""
          type="number"
          v-model="photoToEdit.price"
          placeholder="price"
        />
      </div>
      <div class="inputbox">
        <button class="btn btn-black">Save</button>
      </div>
    </form>
  </section>
</template>

<script>
  import {photoService} from '../services/photo.service.js';

  export default {
    name: 'PhotoEdit',
    components: {},
    data() {
      return {
        photoToEdit: photoService.getEmptyPhoto(),
      };
    },
    created() {
      const photoId = this.photoId;
      if (photoId) {
        photoService
          .getById(photoId)
          .then((photo) => (this.photoToEdit = photo));
      }
    },
    methods: {
      save() {
        photoService.save(this.photoToEdit).then((photo) => {
          this.$router.push('/app');
        });
      },
    },
    computed: {
      formTitle() {
        return this.photoId ? 'Edit photo' : 'Add photo';
      },
      photoId() {
        return this.$route.params.photoId;
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
