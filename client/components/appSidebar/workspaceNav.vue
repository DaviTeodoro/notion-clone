<template>
  <div class="nav">
    <div class="open">+</div>
    <div class="emoji" v-html="pageEmoji"></div>
      <nuxt-link
              :to="{path: '/p/' + page._id}"
              >{{chunkedTitle}}</nuxt-link>
    <div class="dell-btn"
         @click="dellWorkspace">x</div>
  </div>
</template>

<script>
import marked from './workspaceNav/../../../plugins/parse';
import chunkString from './../../plugins/chunkString';
export default {
  props: ['page'],
  data() {
    return {
      hover: false,
      open: false
    };
  },
  computed: {
    pageEmoji() {
      return marked(this.page.emoji);
    },
    chunkedTitle() {
      return chunkString(this.page.title, 18);
    }
  },
  methods: {
    dellWorkspace() {
      this.$store.dispatch('pages/remove', this.page._id);
      this.$router.push('/');
    }
  }
};
</script>

<style scoped lang="scss">
.open {
  margin-left: 8px;
}
.emoji {
  margin-left: 8px;
}
.nav {
  max-height: 36px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.nav a {
  flex: 1;
  margin-left: 8px;
  text-decoration: none;
  color: darkslategrey;
}
.nav:hover {
  background-color: $feedback-color;
}
.dell-btn {
  cursor: pointer;
  opacity: 0;
  padding-right: 10px;
  font-weight: bold;
  color: fade-out($btn-color, 0.3);
  height: 100%;
}
.dell-btn:hover {
  color: $btn-color * 2;
}
.nav:hover .dell-btn {
  opacity: 0.8;
}
</style>
