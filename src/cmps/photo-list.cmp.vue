<template>
  <section class="container-layout masonry">
    <photo-preview
      v-for="(photo, idx) in photos"
      :key="photo._id"
      class="grid"
      @click.stop="showDetails(photo._id)"
      :photo="photo"
      @remove="removePhoto"
    />
    <!-- <div class="btns-container">
        <button @click="removePhoto(photo._id)" class="btn btn-black">X</button>
        <button @click="editPhoto(photo._id)" class="btn btn-black">
          Edit
        </button>
      </div> -->
  </section>
</template>
<script>
  import photoPreview from './photo-preview.cmp.vue';

  export default {
    name: 'PhotoList',
    props: ['photos'],
    emits: ['removed', 'showDetails'],
    components: {
      photoPreview,
    },
    data() {
      return {};
    },
    created() {},
    methods: {
      removePhoto(projId) {
        this.$emit('removed', projId);
      },
      showDetails(photoId) {
        // this.$router.replace(`/details/${photoId}`);
        // this.$router.push(`/details/${photoId}`);
        this.$emit('showDetails', photoId);
      },
      // editPhoto(photoId) {
      //   this.$router.push(`/edit/${photoId}`);
      // },
      // showDetails(photoId) {
      //   this.$router.push(`/details/${photoId}`);
      // },
    },
    computed: {
      randSize() {
        return ['tall', 'wide', 'big'][Math.floor(Math.random() * 3)];
      },
    },
    unmounted() {},
  };
</script>
<style></style>
