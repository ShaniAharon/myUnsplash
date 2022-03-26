<template>
  <section class="resp-grid align-center">
    <div v-for="photo in photos" :key="photo._id">
      <photo-preview
        class="photo-preview card"
        @click="showDetails(photo._id)"
        :photo="photo"
      />
      <div class="btns-container">
        <button @click="removePhoto(photo._id)" class="btn btn-black">X</button>
        <button @click="editPhoto(photo._id)" class="btn btn-black">
          Edit
        </button>
      </div>
    </div>
  </section>
</template>
<script>
  import photoPreview from './photo-preview.cmp.vue';

  export default {
    name: 'PhotoList',
    props: ['photos'],
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
      editPhoto(photoId) {
        this.$router.push(`/edit/${photoId}`);
      },
      showDetails(photoId) {
        this.$router.push(`/details/${photoId}`);
      },
    },
    computed: {},
    unmounted() {},
  };
</script>
<style></style>
