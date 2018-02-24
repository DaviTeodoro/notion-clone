<template>
  <div>
      <div class="app">
        <app-sidebar></app-sidebar>
        <div class="editor">
          <main-menu></main-menu>
          <nuxt/>
        </div>
      </div>
    </div>
</template>
<script>
import mainMenu from './../components/mainMenu';
import appSidebar from './../components/appSidebar';
export default {
  components: {
    mainMenu,
    appSidebar
  }
};
</script>
<style scoped>
.app {
  display: grid;
  height: 100%;
}
.editor {
  display: flex;
  flex-direction: column;
  margin-left: 280px;
}
</style>
