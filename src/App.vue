<template>
  <div class="container">
    <Sidebar />
    <div class="body">
      <Header />
      <router-view />
    </div>
  </div>
</template>
<script setup>
import Sidebar from "@/components/Sidebar.vue";
import Header from "@/components/Header.vue";
</script>
<style lang="scss">
.container {
  display: flex;
  width: 100%;
  & .body {
    width: calc(100% - 170px);
  }
}
</style>
