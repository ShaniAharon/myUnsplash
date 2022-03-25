<template>
  <section class="resp-grid align-center">
    <div v-for="project in projects" :key="project._id">
      <project-preview
        class="project-preview card"
        @click="showDetails(project._id)"
        :project="project"
      />
      <div class="btns-container">
        <button @click="removeProject(project._id)" class="btn btn-black">
          X
        </button>
        <button @click="editProject(project._id)" class="btn btn-black">
          Edit
        </button>
      </div>
    </div>
  </section>
</template>
<script>
  import projectPreview from '../cmps/project-preview.cmp.vue';

  export default {
    name: 'ProjectList',
    props: ['projects'],
    components: {
      projectPreview,
    },
    data() {
      return {};
    },
    created() {},
    methods: {
      removeProject(projId) {
        this.$emit('removed', projId);
      },
      editProject(projectId) {
        this.$router.push(`/edit/${projectId}`);
      },
      showDetails(projectId) {
        this.$router.push(`/details/${projectId}`);
      },
    },
    computed: {},
    unmounted() {},
  };
</script>
<style></style>
