<template>
  <input
    type="text"
    class="input-search"
    v-model="filterBy.label"
    placeholder="Search by name"
    @input="setFilter"
  />
</template>

<script>
  import {utilService} from '../services/util.service.js';
  export default {
    name: 'photo-filter',
    data() {
      return {
        filterBy: {
          label: '',
        },
      };
    },
    created() {
      this.setFilter = utilService.debounce(this.setFilter, 400);
    },
    methods: {
      setFilter() {
        console.log(this.filterBy);
        this.$emit('setFilter', JSON.parse(JSON.stringify(this.filterBy)));
      },
    },
  };
</script>

<style></style>
