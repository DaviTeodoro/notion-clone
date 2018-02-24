<template>
  <div class="side-bar">
    <div class="btn-group">
      <p>Workspace</p>
      <div class="btn" @click="newWorkspace">+</div>
    </div>
    <div class="workspaces-nav">
      <workspace-nav v-for="page in workspaces"
                 :page="page"
                 :key="page._id"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import workspaceNav from './appSidebar/workspaceNav';
export default {
  components: {
    workspaceNav
  },
  data() {
    return {};
  },
  methods: {
    newWorkspace() {
      const workspace = {
        title: 'Workspace Title',
        parent: [{ type: 'root', _id: '' }]
      };
      this.$store
        .dispatch('pages/create', workspace)
        .then(res => {
          console.log('Workspace created');
          this.$router.push('/p/' + res._id);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  computed: {
    ...mapGetters('pages', { getPages: 'find' }),
    workspaces() {
      const params = {
        query: {
          'parent.type': 'root'
        }
      };
      return this.getPages(params).data;
    }
  }
};
</script>

<style scoped lang="scss">
.side-bar {
  background-color: fade-out($btn-color, 0.9);
  flex-grow: 0;
  flex-shrink: 0;
  position: relative;
  width: 260px;
  background: linear-gradient(
    rgb(249, 248, 247),
    rgb(251, 250, 248) 46px,
    rgb(251, 251, 249) 120px,
    rgb(248, 247, 245) 35%,
    rgb(249, 248, 246)
  );
  box-shadow: rgba(0, 0, 0, 0.04) -1px 0px 2px inset;
  height: 100%;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  overflow-x: hidden;
  padding-top: 20px;
}
.btn-group {
  justify-content: space-between;
  align-items: center;
  font-size: 20;
  font-weight: bold;
  margin: 0 12px;
}
// Workspace Navigator
.workspaces-nav {
  display: flex;
  flex-direction: column;
}
</style>
