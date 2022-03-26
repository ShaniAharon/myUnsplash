<template>
  <div class="align-center">
    <!-- <h2>{{ photo.name || photo.label }}</h2> -->
    <img :src="photo?.imgUrl" alt="" />
  </div>
</template>
<script>
  export default {
    name: 'PhotoPreview',
    props: ['photo'],
    components: {},
    data() {
      return {};
    },
    created() {},
    methods: {},
    computed: {},
    unmounted() {},
  };
</script>
<style></style>
