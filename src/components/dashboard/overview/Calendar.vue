<template>
  <section class='calendar'>
    <v-date-picker v-model='date' />
  </section>
</template>

<script>
  export default {
    name: 'Calendar',
    data() {
      return {
        date: new Date().toISOString().substr(0, 10)
      }
    }
  };
</script>

<style lang='scss' scoped>
  .calendar {
    .v-picker {
      width: 100%;
    }
  }
</style>