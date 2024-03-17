import { Component } from './component';
import { fillWordsBox } from './wordsBox';
import { fillResultRow } from './resultsRow';

export function drawLayout(sentences: string[]): void {
  const app = document.querySelector('.app');
  const resultBox = new Component({ className: 'result-box parent' });
  let counter = 1;
  sentences.forEach((sentence) => {
    const resultBoxRow = new Component({ className: 'result-row', text: `${counter}` });
    counter++;
    resultBoxRow.setAttribute('id', `row-${counter}`);
    const words = sentence.split(' ');
    fillResultRow(resultBoxRow, words);
    resultBox.append(resultBoxRow);
  });

  app?.appendChild(resultBox.getNode());
  const wordsBox = new Component({ className: 'words-box parent' }).getNode();
  app?.appendChild(wordsBox);
  if (!sentences[0]) {
    throw new Error('No sentence');
  }
  sentences[0].split(' ').forEach((word, wordIndex) => fillWordsBox(word, wordIndex));
}
