<template>
  <section class="align-center">
    <h2>{{ photo.name || photo.label }}</h2>
    <h3>{{ photo.price }}</h3>
    <img :src="photo?.imgUrl" alt="" />
  </section>
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
