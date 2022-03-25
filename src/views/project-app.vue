<template>
  <main class="main-content">
    <header class="header flex">
      <div>
        <img src="@/assets/unsplash.png" alt="" />
      </div>
      <input type="text" class="input-search" placeholder="Search by name" />
      <button class="btn-add" @click="openModal">Add photo</button>
    </header>
  </main>
  <section class="container-center">
    <project-list
      @removed="removeProject"
      v-if="projects"
      :projects="projectsToShow"
    />
  </section>
  <div v-show="isShow" class="add-modal">
    <form @submit.prevent class="form-add">
      <h1>Add a new photo</h1>
      <h3>Label</h3>
      <input type="text" v-model="photo.label" class="input-big" />
      <h3>Photo URL</h3>
      <input type="text" v-model="photo.imgUrl" class="input-big" />
      <div class="flex">
        <button class="btn btn-black" @click="closeModal">Cancel</button>
        <button class="btn-add" @click="save">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
  import projectList from '../cmps/project-list.cmp.vue';
  import {projectService} from '../services/project.service.js';
  import projectEdit from '../views/project-edit.vue';

  export default {
    name: 'ProjectApp',
    components: {
      projectList,
      projectEdit,
    },
    data() {
      return {
        projects: null,
        isShow: false,
        photo: {
          label: '',
          imgUrl: '',
        },
      };
    },
    created() {
      this.loadProjects();
    },
    methods: {
      loadProjects() {
        projectService.query().then((projs) => {
          console.log(projs);
          this.projects = projs;
        });
      },
      openModal() {
        this.isShow = true;
      },
      closeModal() {
        this.isShow = false;
      },
      save() {
        projectService.save(this.photo).then((photo) => {
          console.log(photo);
          this.loadProjects();
          this.closeModal();
        });
      },
      removeProject(projectId) {
        projectService.remove(projectId).then((projs) => {
          this.projects = projs;
        });
      },
    },
    computed: {
      projectsToShow() {
        return this.projects;
      },
    },
    unmounted() {},
  };
</script>

<style>
  .main-content {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    /* margin: 0 auto; */
  }
</style>
