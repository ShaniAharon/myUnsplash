<template>
  <div v-if="user">hello {{ user.username }}</div>
  <pre>{{ user }}</pre>
  <div class="flex center-div">
    <span>Photo</span>
    <span>Likes</span>
    <span>Collections</span>
  </div>
  <div class="" v-if="photo">
    <img class="small-img" :src="photo.imgUrl" alt="" />
  </div>
  <p class="center">Make something awesome</p>
</template>
<script>
  export default {
    name: 'userPage',
    components: {},
    data() {
      return {
        user: null,
        photo: null,
      };
    },
    created() {
      this.user = this.$store.getters.getUser;
      this.loadPhoto();
    },
    methods: {
      //maybe use aggregation in the back and gets all the photos obj, then run with the list
      //can put in the photo the user id that liked it and show the like on it in the list
      async loadPhoto() {
        if (!this.user.likes.length) return;
        const photoId = this.user.likes[0]; //hard coded for now change it
        const photo = await this.$store.dispatch({
          type: 'getPhotoById',
          photoId,
        });
        this.photo = photo;
        // this.isShow = true;
      },
    },
    computed: {},
    unmounted() {},
  };
</script>
<style></style>
