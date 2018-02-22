<template>
    <div v-if="content.type === 'text'" @click="activeEditor" class="text-block">
      <div v-show="!active" v-html="mk" class="paragraph"></div>
      <textarea id="text-area"
                v-bind:style="{height: textHeight + 'px'}"
                v-on:keyup="keyboardControll"
                v-on:blur="active = false"
                v-if="content.type==='text' && active"
                placeholder="paragraph..."
                @keyup="autoGrow"
                class="paragraph"
                v-model="content.text"/>
   </div>
</template>

<script>
import { textBlockMixin } from './../mixins/textBlock';
export default {
  mixins: [textBlockMixin],
  props: {
    content: {
      type: Object,
      required: true
    }
  },

  updated() {
    try {
      let element = this.$el.querySelector('#text-area');
      if (element) {
        element.focus();
      }
    } catch (e) {}
  }
};
</script>

<style scoped>
.text-block {
  width: 720px;
}
textarea {
  width: 100%;
  padding-top: 16px;
  resize: none;
  overflow: hidden;
  min-height: 20px;
  border: none;
}
textarea:focus {
  outline: none;
}
.paragraph {
  margin: 0px;
  text-align: start;
  font-size: 16px;
  /* height: 100%; */
  color: rgb(66, 66, 65);
  fill: currentcolor;
  line-height: 1.5;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
}
</style>
