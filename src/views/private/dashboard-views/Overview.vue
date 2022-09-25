<template>
  <section class='overview-page'>
    <v-container fluid>
      <div class="row">
        <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-12">
          <Statistics />
        </div>
        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
          <Calendar />
        </div>
      </div>
    </v-container>
  </section>
</template>

<script>
// import Statistics component
import Statistics from "@/components/dashboard/overview/Statistics";
// import Calendar component
import Calendar from "@/components/dashboard/overview/Calendar";

export default {
  name: 'Overview',
  components: {
    Statistics,
    Calendar,
  }
};
</script>

<style lang='scss' scoped>

</style>