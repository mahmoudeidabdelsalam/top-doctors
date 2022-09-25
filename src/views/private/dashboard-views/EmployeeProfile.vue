<template>
  <section class='employee-profile'>
    <v-container fluid>
      Employee Profile: {{ profileId }}
    </v-container>
  </section>
</template>

<script>
  // import mixins
  import crudActionsMixins from '@/mixins/crud-actions-mixins'
  export default {
    name: 'EmployeeProfile',
    data() {
      return {
        // employee profile id
        profileId: this.$route.params.profileId,
        // employee
        employee: [],
      }
    },
    mixins: [crudActionsMixins],
    mounted() {
      // Get employees
      this.getItems(`${localStorage.companyApiUrl}/dashboard/employees/${this.profileId}`, this.employee);
    },
  };
</script>

<style lang='scss' scoped>
  .employee-profile {
    padding: 20px;
  }
</style>