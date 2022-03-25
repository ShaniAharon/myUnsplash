<template>
  <div id="app">
    <img-upload @save="saveImg" />
  </div>
</template>

<script>
  import imgUpload from '@/cmps/img-upload.vue';
  export default {
    data() {
      return {
        imgUrls: [],
      };
    },
    methods: {
      saveImg(imgUrl) {
        this.imgUrls.push(imgUrl);
      },
    },
    components: {
      imgUpload,
    },
  };
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
