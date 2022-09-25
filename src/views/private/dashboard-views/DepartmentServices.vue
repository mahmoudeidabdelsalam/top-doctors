<template>
  <section class="department-services">
    <v-container fluid>
      test :{{id}}
    </v-container>
  </section>
</template>

<script>
  // import mixins
  import crudActionsMixins from '@/mixins/crud-actions-mixins'

  export default {
    name: "DepartmentServices",
    data() {
      return {
        // department service profile id
        id: this.$route.params.id,
        // department
        department: [],
      }
    },
    mixins: [crudActionsMixins],
    mounted() {
      // Get departments
      // this.getItems(`${localStorage.companyApiUrl}/dashboard/departments/${this.profileId}`, this.department);
    },
  }
</script>

<style lang="scss" scoped>
  .department-services {
    padding: 20px;
  }
</style>