<script>
import Footer from "./components/Footer.vue";
import Menu from "./components/Menu.vue";

export default {
  components: { Menu, Footer },
  computed: {
    showHeaderFooter() {
      const p = this.$route.path.toLowerCase();
      return p !== '/' && p !== '/login' && p !== '/signup';
    }
  }
}
</script>

<template>
  <div>
    <Menu v-if="showHeaderFooter" />

    <router-view />

    <Footer v-if="showHeaderFooter" />
  </div>
</template>
