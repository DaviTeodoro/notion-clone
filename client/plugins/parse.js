import marked from 'marked';
import emoji from 'node-emoji';

const parse = function (markdown) {
  const replacer = match => emoji.emojify(match);
  markdown = markdown
    .replace(/(:.*:)/g, replacer)
    .replace(/\[ \]*/g, emoji.emojify(':white_large_square:'))
    .replace(/\[x\]*/g, emoji.emojify(':ballot_box_with_check:'));
  return marked(markdown, {
    table: true,
    sanitize: true,
    gfm: true,
    breaks: true,
  });
};

export default parse;
