<template>
  <div v-if="isLogin" class="delete-modal">
    <form @submit.prevent class="form-delete">
      <h1>Login</h1>
      <h4>Username</h4>
      <input
        type="text"
        ref="username"
        v-model="cred.username"
        placeholder="Your Name :)"
      />
      <h4>Password</h4>
      <input
        type="password"
        v-model="cred.password"
        placeholder="Your password here"
      />
      <div class="flex btns-container">
        <button class="btn btn-cancel" @click="closeModal">Cancel</button>
        <button class="btn-red" @click="login">Login</button>
        <button class="btn-red" @click="switchToJoin">Join</button>
      </div>
    </form>
  </div>
  <div v-else class="delete-modal">
    <form @submit.prevent class="form-delete">
      <h1>Join</h1>
      <h4>Username</h4>
      <input
        type="text"
        ref="username"
        v-model="cred.username"
        placeholder="Create your username :)"
      />
      <h4>Password</h4>
      <input
        type="password"
        v-model="cred.password"
        placeholder="Create your password"
      />
      <div class="flex btns-container">
        <button class="btn btn-cancel" @click="closeModal">Cancel</button>
        <button class="btn-red" @click="signup">Join</button>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'login-page',
    data() {
      return {
        cred: {
          username: '',
          password: '',
        },
        isLogin: true,
      };
    },
    methods: {
      async login() {
        await this.$store.dispatch({type: 'login', cred: this.cred});
        // socketService.emit('set-user-socket', this.$store.getters.getUser._id);
        this.closeModal();
      },
      async signup() {
        const user = await this.$store.dispatch({
          type: 'signup',
          cred: this.cred,
        });
        console.log('you signed up ', user);
        this.closeModal();
      },
      closeModal() {
        this.$emit('close');
      },
      switchToJoin() {
        this.isLogin = false;
        this.cred = {
          username: '',
          password: '',
        };
      },
    },
    mounted() {
      this.$refs.username.focus();
    },
  };
</script>

<style></style>
