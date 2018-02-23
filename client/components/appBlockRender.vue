<template>
  <div class="container">
    <!-- Control Menu -->
    <div class="btn-group controll">
      <span class="dell" href="" @click.prevent="dellElement()">x</span>
      <span class="drag">#</span>
    </div>
    <!-- Page -->
    <page-block v-if="content.type === 'page'" :content="content" @dellBlock="dellElement"/>
    <!-- Markdown text -->
    <text-block :content="content"  @dellBlock="dellElement" @newLine="newLine(index)"/>
   <!-- Empty Line -->
    <div v-if="content.type == 'empty'" @click="activeEditor" class="text-block">
    <textarea id="newLine"
              v-on:keyup="keyboardControll"
              v-bind:style="{height: textHeight + 'px'}"
              placeholder="paragraph..."
              v-on:blur="content.type = 'text'"
              @keyup="autoGrow"
              class="paragraph"
              v-model="content.text">
    </textarea>
    </div>
  </div>
</template>

<script>
import { debounce, throttle } from 'lodash';
import pageBlock from './blocks/pageBlock';
import textBlock from './blocks/textBlock';
import { mapGetters } from 'vuex';
import { textBlockMixin } from './mixins/textBlock';

export default {
  props: ['content', 'index'],
  mixins: [textBlockMixin],

  components: {
    pageBlock,
    textBlock
  },
  methods: {
    dellElement() {
      this.$emit('dellBlock', this.index);
    },
    newLine(index) {
      this.$emit('newLine', this.index);
    },
    activeEditor(event) {
      if (!this.active) {
        this.active = true;
        let element = event.path[1];
        this.textHeight = element.offsetHeight;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: row;
}
.drag {
  padding: 5px;
  cursor: move;
}
.dell {
  padding: 5px;
  cursor: pointer;
}
.controll {
  opacity: 0;
  justify-items: top;
  display: flex;
  flex-direction: row;
  transition-duration: 300ms;
}
.controll:hover {
  opacity: 1;
}
.controll span {
  font-size: 22px;
}
.text-block {
  width: $editor-size;
}
textarea {
  width: 100%;
  padding: 0;
  margin: 0;
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
  font-size: $editor-font-size;
  height: 100%;
  color: rgb(66, 66, 65);
  fill: currentcolor;
  line-height: 1.5;
  font-family: $editor-font;
}
</style>
