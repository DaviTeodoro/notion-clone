import { chunk } from 'lodash';

const chunkSring = function (string, size) {
  const chunkedString = chunk(string, size);
  if (chunkedString[1]) {
    return `${chunk(string, size)[0].join('')}...`;
  }
  return string;
};

export default chunkSring;
