<template>
  <div class="img-container">
    <button
      @click.stop="openModal"
      @mouseover="on"
      v-show="isHover"
      class="btn btn-delete"
    >
      delete
    </button>
    <!-- <button
      v-show="isHover"
      @click.stop="onLike"
      @mouseover="on"
      :class="isLiked"
    >
      <i class="fa-solid fa-heart"></i>
    </button> -->
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
        like: false,
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
      async onLike() {
        //TODO: like logic here
        if (!this.like) {
          //TODO: check if you already have this like
          let user = this.$store.getters.getUser;
          if (!user) return console.log('need to log in first');
          user.likes.push(this.photo._id); //maybe do this in the store or check if its the best way
          try {
            await this.$store.dispatch({type: 'updateUser', user});
            console.log('user updated');
          } catch (err) {
            console.log('cannot update user', err);
          }
        }
        this.like = !this.like;
      },
    },
    computed: {
      isLiked() {
        return this.like ? 'like-clicked' : 'like';
      },
    },
    unmounted() {},
  };
</script>
<style></style>
