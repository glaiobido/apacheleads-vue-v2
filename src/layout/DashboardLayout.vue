<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar
      :background-color="sidebarBackground"
      short-title="Argon"
      title="Argon test"
    >
      <template slot="links">
        <sidebar-item
          :link="{
            name: 'Dashboard',
            icon: 'ni ni-chart-bar-32 text-default',
            path: '/dashboard'
          }"
        />
  
        <sidebar-item :link="{name: 'Import Leads', icon: 'ni ni-watch-time text-default', path: '/import-leads'}"/>
        <sidebar-item :link="{name: 'Leads', icon: 'ni ni-money-coins text-default', path: '/leads'}"/>
        <sidebar-item :link="{name: 'Lead Types', icon: 'ni ni-basket text-default', path: '/lead-types'}"/>
        <sidebar-item :link="{name: 'Orders', icon: 'ni ni-delivery-fast text-default', path: '/profile'}"/>
      

      </template>
    </side-bar>
    <div class="main-content" :data="sidebarBackground">
      <dashboard-navbar></dashboard-navbar>

      <div @click="toggleSidebar">
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
        </fade-transition>
        <content-footer v-if="!$route.meta.hideFooter"></content-footer>
      </div>
    </div>
  </div>
</template>
<script>
  import DashboardNavbar from './DashboardNavbar.vue';
  import ContentFooter from './ContentFooter.vue';
  import { FadeTransition } from 'vue2-transitions';

  export default {
    components: {
      DashboardNavbar,
      ContentFooter,
      FadeTransition
    },
    data() {
      return {
        sidebarBackground: 'primary' //vue|blue|orange|green|red|primary
      };
    },
    methods: {
      toggleSidebar() {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false);
        }
      }
    }
  };
</script>
<style lang="scss">
</style>
