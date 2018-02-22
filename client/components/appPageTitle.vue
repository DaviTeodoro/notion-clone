<template>
  <div>
    <img src="" alt="">
    <textarea id="text-area"
              v-bind:style="{height: textHeight + 'px'}"
              v-bind:value="title"
              v-on:input="updateValue($event.target.value)"
              placeholder="Page title..."
              @keyup="autoGrow"
              v-on:keydown.stop="keyboardControll"
              class="page-title"/>
  </div>
</template>

<script>
import { textBlockMixin } from './mixins/textBlock';
export default {
  props: ['title'],
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
  mounted() {
    const element = this.$el.querySelector('#text-area');
    this.textHeight = element.scrollHeight;
  }
};
</script>

<style scoped>
.page-title {
  align-self: flex-start;
  width: 680px;
  padding: 0;
  margin: 0;
  resize: none;
  overflow: hidden;
  min-height: 100px;
  border: none;
  text-align: start;
  font-size: 32px;
  font-weight: bold;
  color: rgb(66, 66, 65);
  fill: currentcolor;
  line-height: 1.5;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
}
.page-title:focus {
  outline: none;
}
</style>
