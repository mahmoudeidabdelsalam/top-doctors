<template>
  <div class="home">
    
  </div>
</template>

<script>

export default {
  name: "Home",
  created() {
    // redirect to login page
    this.$router.push({ name: "Login" });
  },
};
</script>
