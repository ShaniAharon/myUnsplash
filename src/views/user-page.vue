<template>
  <div v-if="user">hello {{ user.username }}</div>
  <pre>{{ user }}</pre>
  <div class="flex center-div">
    <span>Photo</span>
    <span>Likes</span>
    <span>Collections</span>
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
      };
    },
    created() {
      this.user = this.$store.getters.getUser;
    },
    methods: {},
    computed: {},
    unmounted() {},
  };
</script>
<style></style>
