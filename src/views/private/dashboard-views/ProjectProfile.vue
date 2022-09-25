<template>
  <section class='project-profile'>
    <v-container fluid>
      Project Profile: {{ profileId }}
    </v-container>
  </section>
</template>

<script>
  // import mixins
  import crudActionsMixins from '@/mixins/crud-actions-mixins'
  export default {
    name: 'ProjectProfile',
    data() {
      return {
        // project profile id
        profileId: this.$route.params.profileId,
        // project
        project: [],
      }
    },
    mixins: [crudActionsMixins],
    mounted() {
      // Get projects
      this.getItems(`${localStorage.companyApiUrl}/dashboard/projects/${this.profileId}`, this.project);
    },
  };
</script>

<style lang='scss' scoped>
  .project-profile {
    padding: 20px;
  }
</style>