<template>
  <section class="container" @keydown.ctrl.83.prevent="savePage">
    <app-breadcrumb :parent="page.parent" :title="page.title" />
    <app-page-title :title="page.title" @input="updateTitle" @newLine="newLine()"/>
    <draggable v-model="page.blocks" :options="{group:'people'}" @start="drag=true" @end="drag=false">
      <app-block-render v-for="(block, index) in page.blocks"
                :key="block.id"
                class="block"
                :content="block.content"
                @dellBlock="dell(index)"
                @newLine="newLine(index)"
                :index="index"></app-block-render>
      </draggable>
    <app-new-block @newBlock="createBlock($event)"> </app-new-block>
    <div class="btn-group">
      <div class="btn" @click="dellPage">dell</div>
      <div class="btn" @click="savePage">save</div>
    </div>
<!-- <pre>{{page}}</pre> -->
  </section>
</template>

<script>
import { debounce, throttle } from 'lodash';
import draggable from 'vuedraggable';
import appBlockRender from './../../components/appBlockRender.vue';
import appPageTitle from './../../components/appPageTitle';
import appBreadcrumb from './../../components/appBreadcrumb.vue';
import appNewBlock from './../../components/appNewBlock.vue';
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  components: {
    appPageTitle,
    appBlockRender,
    appNewBlock,
    draggable,
    appBreadcrumb
  },
  async fetch({ store, params }) {
    return new Promise((resolve, reject) => {
      try {
        resolve(store.dispatch('pages/get', params.page));
      } catch (error) {
        reject(error);
      }
    });
  },
  computed: {
    ...mapGetters('pages', { getPage: 'get' }),
    page() {
      return this.getPage(this.$route.params.page);
    }
  },
  methods: {
    ...mapActions({
      patchPage: 'pages/patch',
      removePage: 'pages/remove'
    }),
    ...mapMutations({ removePageStore: 'pages/removeItem' }),
    async savePage() {
      try {
        await this.patchPage([this.page._id, this.page]).then(res => {
          console.log('Documento foi salvo.');
        });
      } catch (e) {
        throw e;
      }
    },
    async dellPage() {
      try {
        this.$router.push('/');
        await this.removePage(this.page._id).then(res => {
          this.removePageStore(this.page._id);
          this.$store.commit('pages/clearAll');
        });
      } catch (e) {
        throw e;
      }
    },
    updateTitle(value) {
      this.page.title = value;
    },
    createBlock({ id, content }) {
      let newBlock = { id, content };
      this.page.blocks.push(newBlock);
      this.savePage();
    },
    dell(index) {
      this.page.blocks.splice(index, 1);
      console.log('O block' + index + 'foi deletado');
      this.savePage();
    },
    newLine(index) {
      let newBlock = {
        id: String(new Date()),
        content: {
          type: 'empty',
          text: ''
        }
      };
      this.page.blocks.splice(index + 1, 0, newBlock);
    }
  },
  updated() {
    try {
      let element = this.$el.querySelector('#newLine');
      element.focus();
    } catch (e) {
      console.log(e);
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 20px 0px 16px 0px;
}
</style>
