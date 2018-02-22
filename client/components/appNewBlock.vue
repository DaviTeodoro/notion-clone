<template>
  <div class="btn-group">
    <!-- <textarea placeholder="/header..."
              id=""
              cols="30"
              rows="4"></textarea> -->
    <a class="btn" @click.prevent="newHeader">h1</a>
    <a class="btn" @click.prevent="newParagraph">p</a>
    <a class="btn" @click.prevent="newPage">Page</a>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      block: {}
    };
  },
  methods: {
    ...mapActions('pages', ['create']),
    newHeader() {
      this.block = {
        id: String(new Date()),
        content: {
          type: 'text',
          text: '# header'
        }
      };
      this.$emit('newBlock', this.block);
    },
    newParagraph() {
      this.block = {
        id: String(new Date()),
        content: {
          type: 'text',
          text: '...'
        }
      };
      this.$emit('newBlock', this.block);
    },
    async newPage() {
      const page = {
        title: 'Page title',
        url: 'page-title-3123',
        parent: [{ _id: this.$route.params.page }]
      };
      try {
        await this.create(page).then(res => {
          this.block = {
            id: String(new Date()),
            content: {
              type: 'page',
              pageId: res._id,
              link: '/p/' + res._id
            }
          };
          this.$emit('newBlock', this.block);
        });
      } catch (e) {
        throw e;
      }
    }
  }
};
</script>

<style scoped>
a {
  margin: 10px;
}
.container {
  max-width: 600px;
  display: flex;
  flex-direction: row;
}
</style>
