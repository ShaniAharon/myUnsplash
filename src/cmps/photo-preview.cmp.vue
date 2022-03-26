<template>
  <div class="img-container">
    <button
      @click="removePhoto"
      @mouseover="on"
      v-show="isHover"
      class="btn btn-delete"
    >
      delete
    </button>
    <img @mouseover="on" @mouseout="off" :src="photo?.imgUrl" alt="" />
    <h2 @mouseover="on" v-show="isHover" class="label">{{ photo.label }}</h2>
  </div>
</template>
<script>
  export default {
    name: 'PhotoPreview',
    props: ['photo'],
    components: {},
    data() {
      return {
        isHover: false,
      };
    },
    created() {},
    methods: {
      on() {
        this.isHover = true;
      },
      off() {
        this.isHover = false;
      },
      removePhoto() {
        this.$emit('remove', this.photo._id);
      },
    },
    computed: {},
    unmounted() {},
  };
</script>
<style></style>
