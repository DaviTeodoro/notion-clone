<template>
  <div class="btn-group breadcrumb">
    /
    <nuxt-link v-if="parent != null" :to="'/p/' + parent[0]._id"
               class="btn"
               >{{parentTitle}}</nuxt-link> /
    <div class="btn">{{chunkedTitle}}</div>
  </div>
</template>

<script>
import chunkString from './../plugins/chunkString';
export default {
  props: ['parent', 'title'],
  data() {
    return {
      parentTitle: ''
    };
  },
  computed: {
    chunkedTitle() {
      return chunkString(this.title, 30);
    }
  },
  mounted() {
    const parentId = this.parent[0]._id;
    this.$store
      .dispatch('pages/get', parentId)
      .then(res => {
        this.parentTitle = chunkString(res.title, 30);
      })
      .catch(e => {
        if ((e.code = 404)) {
          console.log(
            'Essa pagina nao tem pai e deve ser enviada para a lixeira'
          );
        }
      });
  }
};
</script>

<style scoped>

</style>
