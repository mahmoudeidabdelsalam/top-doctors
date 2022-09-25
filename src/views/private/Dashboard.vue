<template>
  <main class='dashboard'>
    <!-- Sidebar -->
    <v-navigation-drawer v-model="drawer" app>
      <Sidebar />
    </v-navigation-drawer>

    <!-- Header -->
    <v-card class="overflow-hidden">
      <v-app-bar
        app
        color="white"
        elevate-on-scroll
        scroll-target="#scrolling-techniques-7"
      >
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>Dashboard</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>

        <div>
          <v-badge
            avatar
            bordered
            overlap
          >
            <template v-slot:badge>
              <v-avatar>
                <span>2</span>
              </v-avatar>
            </template>

            <span class="material-icons">notifications_active</span>
          </v-badge>
        </div>

        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-app-bar>
    </v-card>

    <!-- dashboard views -->
    <div>
      <router-view class="dashboard-views"></router-view>
    </div>
  </main>
</template>

<script>
// import sidebar
import Sidebar from '@/layouts/Sidebar.vue';
export default {
  name: 'Dashboard',
  components: {
    Sidebar,
  },
  data() {
    return {
      drawer: null
    };
  },
};
</script>

<style lang='scss' scoped>
@import '@/assets/scss/pages/private/_dashboard.scss';
</style>