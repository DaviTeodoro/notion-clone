<template>
<div>
  <div class="page-block">
    <nuxt-link :to="content.link" class="page-link">
      <div v-html="emoji"></div>
      <h3> {{title}}</h3>
    </nuxt-link>
  </div>
</div>
</template>

<script>
import marked from './../../plugins/parse';
export default {
  props: ['content'],
  data() {
    return {
      title: '.....',
      emoji: ':page_facing_up:'
    };
  },
  created() {
    if (this.content.type === 'page') {
      this.$store
        .dispatch('pages/get', this.content.pageId)
        .then(res => {
          this.title = res.title;
          this.emoji = marked(res.emoji);
        })
        .catch(e => {
          if (e.code == 404) {
            this.$emit('dellBlock', this.index);
          }
        });
    }
  }
};
</script>

<style scoped lang="scss">
.page-block {
  cursor: pointer;
  width: $editor-size;
  transition-duration: 300ms;
  border-radius: 3px;
  padding: 1px 0px;
}
.page-block:hover {
  background-color: rgba(194, 194, 194, 0.24);
}
.page-link {
  display: flex;
  align-items: center;
  text-decoration: none;
}
</style>
