<template>
  <div>
    <div class="page-icon" v-html="markdown" @click="updateEmoji"></div>
    <textarea id="text-area"
              v-bind:style="{height: textHeight + 'px'}"
              v-bind:value="page.title"
              v-on:input="updateValue($event.target.value)"
              placeholder="Page title..."
              v-on:keyup.stop="keyboardControll"
              class="page-title"/>
  </div>
</template>

<script>
import marked from './../plugins/parse';
import { textBlockMixin } from './mixins/textBlock';
export default {
  props: ['page'],
  mixins: [textBlockMixin],
  data() {
    return {
      textHeight: 0
    };
  },
  methods: {
    updateValue(value) {
      this.$emit('input', value);
    },
    updateEmoji() {
      switch (this.page.emoji) {
        case ':page_facing_up:':
          this.$emit('updateEmoji', ':pig:');
          break;
        case ':pig:':
          this.$emit('updateEmoji', ':heart:');
          break;
        case ':heart:':
          this.$emit('updateEmoji', ':herb:');
          break;
        case ':herb:':
          this.$emit('updateEmoji', ':page_facing_up:');
          break;
        default:
          break;
      }
    },
    keyboardControll(event) {
      switch (event.key) {
        case 'Enter':
          this.$emit('newLine', 0);
          break;
        default:
          break;
      }
    }
  },
  computed: {
    markdown() {
      return marked(this.page.emoji);
    }
  },
  mounted() {
    const element = this.$el.querySelector('#text-area');
    this.textHeight = element.scrollHeight;
  }
};
</script>

<style scoped lang="scss">
.page-title {
  align-self: flex-start;
  width: $editor-size - 40;
  padding: 0;
  margin: 0;
  resize: none;
  overflow: hidden;
  min-height: 80px;
  border: none;
  text-align: start;
  font-size: 32px;
  font-weight: bold;
  color: rgb(66, 66, 65);
  fill: currentcolor;
  line-height: 1.5;
  font-family: $editor-font;
}
.page-title:focus {
  outline: none;
}
.page-icon {
  font-size: 46px;
  cursor: pointer;
  width: 30px;
}
</style>
