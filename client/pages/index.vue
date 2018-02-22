<template>
  <section class="container">
    <div class="pages-grid">
      <!-- <draggable v-model="pages" :options="{group:'people'}" @start="drag=true" @end="drag=false"> -->
        <nuxt-link v-for="page in pages"
                   :key="page._id"
                   :to="{path: '/p/' + page._id}"
                  class="btn page-icons">
          <h1>📄</h1>
          <h4>{{page.title}}</h4>
        </nuxt-link>
      <!-- </draggable> -->
    </div>
    <!-- <pre>{{pages}}</pre> -->
    <app-new-block @newBlock="createBlock($event)"> </app-new-block>
  </section>
</template>

<script>
import draggable from 'vuedraggable';
import appPageTitle from './../components/appPageTitle';
import appNewBlock from './../components/appNewBlock.vue';
import { mapGetters } from 'vuex';
export default {
  components: {
    appPageTitle,
    appNewBlock,
    draggable,
  },
  fetch({ store, params }) {
    return new Promise((resolve, reject) => {
      try {
        store.commit('pages/clearAll');
        resolve(
          store.dispatch('pages/find', {
            query: {
              $limit: 100
            }
          })
        );
      } catch (error) {
        reject(error);
      }
    });
  },
  computed: {
    ...mapGetters('pages', { getPages: 'find' }),
    pages() {
      return this.getPages().data;
    }
  }
};
</script>

<style scoped>
.container {
  display: grid;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 10px;
}
.pages-grid {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(100px, 120px));
}
.page-icons {
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  text-align: center;
}
</style>
