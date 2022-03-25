<template>
  <div v-if="!isUploaded" class="home-page center upload-center">
    <h1>{{ title }}</h1>
    <template v-if="!isLoading">
      <h4>File should be Jpeg, Png...</h4>
      <!-- UPLOAD IMG -->
      <label
        for="imgUploader"
        @drop.prevent="handleFile"
        @dragover.prevent="isDragOver = true"
        @dragleave="isDragOver = false"
        :class="{drag: isDragOver, 'not-drag': !isDragOver}"
      >
        <!--prevent on drop and dragover is importent soo the img will not open in the browser-->
        <img src="src/assets/upload.png" alt="Drop images here" />
        <h3>Drag & Drop your image here</h3>
      </label>
      <h4>Or</h4>
      <input type="file" ref="file" style="display: none" />
      <button @click="$refs.file.click()">Choose a file</button>
      <!-- HIDDEN INPUT -->
      <input
        type="file"
        name="img-uploader"
        id="imgUploader"
        @change="handleFile"
      />
    </template>
    <!-- LOADER -->
    <img v-else src="src/assets/loader.gif" alt="" />
  </div>
  <div v-else class="home-page center upload-center">
    <i class="fa-solid fa-circle-check ok"></i>
    <h1>Uploaded Successfully!</h1>
    <template v-if="!isLoading">
      <img class="uploaded-img" @load="onImgLoad" :src="imgUrl" alt="" />
      <p class="p-test"></p>
      <input type="text" :value="imgUrl" class="input-test" />
      <button class="btn-test" @click="copyToClip">Copy Link</button>
    </template>
  </div>
</template>

<script>
  import {uploadImg} from '@/services/img-upload.service.js';
  export default {
    data() {
      return {
        isLoading: false,
        isDragOver: false,
        isUploaded: false,
        imgUrl: '',
      };
    },
    methods: {
      handleFile(ev) {
        //added to determine if its change from input or drop , and gets the file
        let file;
        if (ev.type === 'change') file = ev.target.files[0];
        else if (ev.type === 'drop') file = ev.dataTransfer.files[0];
        console.log('ev', ev);
        this.onUploadImg(file); // send the file to upload it
      },
      async onUploadImg(file) {
        this.isLoading = true;
        this.isDragOver = false;
        const res = await uploadImg(file);
        // this.$emit('save', res.url);
        this.imgUrl = res.url;
        this.isUploaded = true;
        this.isLoading = false;
      },
      copyToClip() {
        navigator.clipboard.writeText(this.imgUrl);
      },
      onImgLoad() {
        //TDO: try to make the all div apper only when the img ready
        console.log('yes');
      },
    },
    computed: {
      title() {
        return this.isLoading ? 'Uploading...' : 'Upload your image';
      },
    },
  };
</script>

<style>
  .loader {
    height: 150px;
  }
  label {
    cursor: pointer;
    transition: background-color 0.3s;
  }
  label img {
    height: 100px;
    width: 50px;
  }
  input {
    height: 0;
    width: 0;
  }
  .drag {
    color: grey;
    background-color: #e9f1fc;
    display: inline-block;
    padding: 30px 5px;
    height: 250px;
    width: 400px;
    border: 4px dashed #cee0f8;
    border-radius: 8px;
  }
  .not-drag {
    color: grey;
    background-color: #f6f8fb;
    display: inline-block;
    padding: 30px 5px;
    height: 250px;
    width: 400px;
    border: 4px dashed #cee0f8;
    border-radius: 8px;
  }
  .light {
    font-weight: lighter;
  }
</style>
