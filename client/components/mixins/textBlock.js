import marked from './../../plugins/parse.js';

export const textBlockMixin = {
  data() {
    return {
      active: false,
      enter: 0,
      backspace: 0,
      textHeight: 0,
    };
  },
  methods: {
    autoGrow() {
      const element = this.$el.querySelector('#text-area') || this.$el.querySelector('#newLine');
      element.style.height = 'auto';
      element.style.height = `${element.scrollHeight + 22}px`;
    },
    activeEditor(event) {
      if (!this.active) {
        this.active = true;
        const element = event.path[1];
        this.textHeight = element.offsetHeight + 22;
      }
    },
    keyboardControll(event) {
      switch (event.key) {
        case 'Enter':
          this.enter += 1;
          if (this.enter == 2) {
            this.active = false;
            this.enter = 0;
            this.textHeight = 0;
            this.content.type = 'text';
            this.content.text = this.content.text.replace(/^(?=\n)$|^\s*|\s*$|\n\n+/gm, '');
            this.$emit('newLine', this.index);
          }
          break;
        case 'Backspace':
          this.enter = 0;
          if (this.content.text === '') {
            this.backspace += 1;
            if (this.backspace == 2) {
              this.$emit('dellBlock', this.index);
              console.log('emiti dell');
            }
          }
          break;
        default:
          this.enter = 0;
          this.backspace = 0;
          break;
      }
    },
  },
  computed: {
    markdown() {
      return marked(this.content.text);
    },
  },
};
