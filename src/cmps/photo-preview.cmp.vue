<template>
  <div class="img-container">
    <!-- TODO: need to add modal with password for delete -->
    <button
      @click.stop="openModal"
      @mouseover="on"
      v-show="isHover"
      class="btn btn-delete"
    >
      delete
    </button>
    <img @mouseover="on" @mouseout="off" :src="photo?.imgUrl" alt="" />
    <h2 @mouseover="on" v-show="isHover" class="label">{{ photo.label }}</h2>
    <div v-show="isShow" class="delete-modal">
      <form @submit.prevent class="form-delete">
        <h1>Are you sure?</h1>
        <h4>Password</h4>
        <input type="password" placeholder="Your password here :)" />
        <div class="flex btns-container">
          <button class="btn btn-cancel" @click.stop="closeModal">
            Cancel
          </button>
          <button class="btn-red" @click.stop="removePhoto">Delete</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'PhotoPreview',
    props: ['photo'],
    emits: ['remove'],
    components: {},
    data() {
      return {
        isHover: false,
        isShow: false,
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
      openModal() {
        console.log('im opening');
        this.isShow = true;
      },
      closeModal() {
        this.isShow = false;
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
