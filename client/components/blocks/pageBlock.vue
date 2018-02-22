<template>
<div>
  <div class="page-block">
    <nuxt-link :to="content.link" class="page-link">
      <h3>📄 {{title}}</h3>
    </nuxt-link>
  </div>
</div>
</template>

<script>
export default {
  props: ['content'],
  data() {
    return {
      title: '.....'
    };
  },
  created() {
    if (this.content.type === 'page') {
      this.$store
        .dispatch('pages/get', this.content.pageId)
        .then(res => {
          this.title = res.title;
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

<style scoped>
.page-block {
  cursor: pointer;
  width: 600px;
  transition-duration: 300ms;
  border-radius: 3px;
  padding: 1px 0px;
}
.page-block:hover {
  background-color: rgba(194, 194, 194, 0.24);
}
.page-link {
  text-decoration: none;
}
</style>
