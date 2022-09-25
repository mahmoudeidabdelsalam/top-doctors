<template>
  <aside class='dashboard-sidebar'>
    <!-- sidebar brand logo -->
    <div class="brand">
      <img src="@/assets/images/pages/global/logo.png" alt="Top Doctors">
    </div>

    <!-- sidebar main navbar -->
    <div class="sidebar-nav">
      <!-- main menu -->
      <ul class="main-menu">
        <li class="category-name">
          <span>{{ $t('side.menu') }}</span>
        </li>
        <!-- main menu item -->
        <li :class="$route.name === 'Overview' ? 'main-menu-item active' : 'main-menu-item'">
          <!-- main menu link -->
          <router-link :to="{ name: 'Overview' }" class="main-menu-link">
            <div class="content">
              <v-icon>dashboard_customize</v-icon>
              <span class="text">{{ $t('side.dashboard') }}</span>
            </div>
          </router-link>
        </li>

        <li class="category-name">
          <span>{{ $t('side.general') }}</span>
        </li>

        <!-- main menu item -->
        <li :class="$route.name === 'Departments' || $route.name === 'Services' || $route.name === 'DepartmentsServices' ? 'main-menu-item active' : 'main-menu-item'">
          <!-- main menu link -->
          <div class="main-menu-link">
            <div class="content">
              <v-icon>dashboard</v-icon>
              <span class="text">{{ $t('side.departments') }}</span>
            </div>
            <!-- arrow -->
            <div class="arrow">
              <v-icon>chevron_right</v-icon>
            </div>
          </div>

          <!-- submenu -->
          <ul class="submenu">
            <!-- submenu item -->
            <li class="submenu-item">
              <!-- submenu link -->
              <router-link :to="{ name: 'Departments' }" class="submenu-link">
                <span class="text">{{ $t('side.departments') }}</span>
              </router-link>
            </li>

            <!-- submenu item -->
            <li class="submenu-item">
              <!-- submenu link -->
              <router-link :to="{ name: 'Services' }" class="submenu-link">
                <span class="text">{{ $t('side.services') }}</span>
              </router-link>
            </li>
          </ul>
        </li>

        <li class="category-name">
          <span>{{ $t('side.staff') }}</span>
        </li>
        <!-- main menu item -->
        <li :class="$route.name === 'Employees' || $route.name === 'Roles' ? 'main-menu-item active' : 'main-menu-item'">
          <!-- main menu link -->
          <div class="main-menu-link">
            <div class="content">
              <v-icon>badge</v-icon>
              <span class="text">{{ $t('side.employees') }}</span>
            </div>
            <!-- arrow -->
            <div class="arrow">
              <v-icon>chevron_right</v-icon>
            </div>
          </div>

          <!-- submenu -->
          <ul class="submenu">
            <!-- submenu item -->
            <li class="submenu-item">
              <!-- submenu link -->
              <router-link :to="{ name: 'Employees' }" class="submenu-link">
                <span class="text">{{ $t('side.employees') }}</span>
              </router-link>
            </li>

            <!-- submenu item -->
            <li class="submenu-item">
              <!-- submenu link -->
              <router-link :to="{ name: 'Roles' }" class="submenu-link">
                <span class="text">{{ $t('side.roles') }}</span>
              </router-link>
            </li>
          </ul>
        </li>

        <!-- main menu item -->
        <li :class="$route.name === 'Doctors' || $route.name === 'Assistants' ? 'main-menu-item active' : 'main-menu-item'">
          <!-- main menu link -->
          <div class="main-menu-link">
            <div class="content">
              <v-icon>group</v-icon>
              <span class="text">{{ $t('side.doctors') }}</span>
            </div>
            <!-- arrow -->
            <div class="arrow">
              <v-icon>chevron_right</v-icon>
            </div>
          </div>

          <!-- submenu -->
          <ul class="submenu">
            <!-- submenu item -->
            <li class="submenu-item">
              <!-- submenu link -->
              <router-link :to="{ name: 'Doctors' }" class="submenu-link">
                <span class="text">{{ $t('side.doctors') }}</span>
              </router-link>
            </li>

            <!-- submenu item -->
            <li class="submenu-item">
              <!-- submenu link -->
              <router-link :to="{ name: 'Assistants' }" class="submenu-link">
                <span class="text">{{ $t('side.assistants') }}</span>
              </router-link>
            </li>
          </ul>
        </li>

        <li class="category-name">
          <span>{{ $t('side.clinic') }}</span>
        </li>
        <!-- main menu item -->
        <li :class="$route.name === 'Projects' ? 'main-menu-item active' : 'main-menu-item'">
          <!-- main menu link -->
          <router-link :to="{ name: 'Projects' }" class="main-menu-link">
            <div class="content">
              <v-icon>picture_in_picture</v-icon>
              <span class="text">{{ $t('side.projects') }}</span>
            </div>
          </router-link>
        </li>

        <!-- main menu item -->
        <li :class="$route.name === 'Leads' ? 'main-menu-item active' : 'main-menu-item'">
          <!-- main menu link -->
          <router-link :to="{ name: 'Leads' }" class="main-menu-link">
            <div class="content">
              <v-icon>touch_app</v-icon>
              <span class="text">{{ $t('side.leads') }}</span>
            </div>
          </router-link>
        </li>

        <!-- main menu item -->
        <li :class="$route.name === 'Invoices' ? 'main-menu-item active' : 'main-menu-item'">
          <!-- main menu link -->
          <router-link :to="{ name: 'Invoices' }" class="main-menu-link">
            <div class="content">
              <v-icon>request_quote</v-icon>
              <span class="text">{{ $t('side.invoices') }}</span>
            </div>
          </router-link>
        </li>

        <!-- main menu item -->
        <li :class="$route.name === 'PublicForms' ? 'main-menu-item active' : 'main-menu-item'">
          <!-- main menu link -->
          <router-link :to="{ name: 'PublicForms' }" class="main-menu-link">
            <div class="content">
              <v-icon>format_list_bulleted</v-icon>
              <span class="text">{{ $t('side.public_forms') }}</span>
            </div>
          </router-link>
        </li>

        <!-- main menu item -->
        <li :class="$route.name === 'Reservations' ? 'main-menu-item active' : 'main-menu-item'">
          <!-- main menu link -->
          <router-link :to="{ name: 'Reservations' }" class="main-menu-link">
            <div class="content">
              <v-icon>schedule</v-icon>
              <span class="text">{{ $t('side.reservations') }}</span>
            </div>
          </router-link>
        </li>

        <!-- main menu item -->
        <li :class="$route.name === 'Reports' ? 'main-menu-item active' : 'main-menu-item'">
          <!-- main menu link -->
          <router-link :to="{ name: 'Reports' }" class="main-menu-link">
            <div class="content">
              <v-icon>description</v-icon>
              <span class="text">{{ $t('side.reports') }}</span>
            </div>
          </router-link>
        </li>

        <!-- main menu item -->
        <!-- <li :class="$route.name === 'BudgetForms' ? 'main-menu-item active' : 'main-menu-item'">
          main menu link
          <router-link :to="{ name: 'BudgetForms' }" class="main-menu-link">
            <div class="content">
              <v-icon>paid</v-icon>
              <span class="text">{{ $t('side.budget_forms') }}</span>
            </div>
          </router-link>
        </li> -->

        <!-- main menu item -->
        <!-- <li :class="$route.name === 'Coupones' ? 'main-menu-item active' : 'main-menu-item'">
          main menu link
          <router-link :to="{ name: 'Coupones' }" class="main-menu-link">
            <div class="content">
              <v-icon>discount</v-icon>
              <span class="text">{{ $t('side.coupones') }}</span>
            </div>
          </router-link>
        </li> -->

      </ul>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'Sidebar',
  mounted() {
    // add class active to current main menu item
    this.$nextTick(() => {
      const mainMenuItems = document.querySelectorAll('.main-menu-item');
      mainMenuItems.forEach(item => {
        item.addEventListener('click', () => {
          mainMenuItems.forEach(item => {
            item.classList.remove('active');
          });
          item.classList.add('active');
        });
      });
    });
  }
};
</script>

<style lang='scss' scoped>
@import '@/assets/scss/layouts/_sidebar.scss';
.dashboard-sidebar .brand {
    padding: 45px !important;
}
</style>