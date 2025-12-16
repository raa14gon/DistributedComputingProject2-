<script>
import Footer from "./components/Footer.vue";
import Menu from "./components/Menu.vue";

export default {
  components: { Menu, Footer },
  computed: {
    showHeaderFooter() {
      return this.$route.path !== '/' && this.$route.path !== '/Login' && this.$route.path !== '/SignUp';
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
