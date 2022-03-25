<template>
  <section class="align-center">
    <h2>{{ project.name }}</h2>
    <h3>{{ project.price }}</h3>
    <img :src="project?.imgUrl" alt="" />
  </section>
</template>
<script>
  export default {
    name: 'ProjectPreview',
    props: ['project'],
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
