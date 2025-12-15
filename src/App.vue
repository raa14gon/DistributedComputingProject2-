<script>
import Footer from "./components/Footer.vue";
import Menu from "./components/Menu.vue";

export default {
  components: { Menu, Footer }
}
</script>

<template>
  <div>
    <Menu />
    
    <router-view />

    <Footer />
  </div>
</template>
