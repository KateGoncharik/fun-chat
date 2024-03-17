import { Component } from './component';
import { putOnFirstFreePosition } from './training';

export function fillWordsBox(word: string, wordIndex: number): void {
  const wordsBox = document.querySelector('.words-box');
  const wordCard = new Component({ className: 'word', text: word });

  wordCard.setAttribute('draggable', 'true');
  wordCard.setAttribute('id', `word-${wordIndex}`);

  wordCard.addListener('dragstart', (event) => {
    if (event instanceof DragEvent && event.target instanceof HTMLElement) {
      event.dataTransfer?.setData('cardId', event.target?.id);
    }
  });
  wordCard.addListener('drop', (event) => {
    event.preventDefault();
    return;
  });
  wordCard.addListener('click', (event) => {
    if (!(event.target && event.target instanceof HTMLElement)) {
      return;
    }
    const parent = event.target.closest('.parent');
    if (!parent) {
      throw new Error('Parent expected');
    }
    if (!(parent instanceof HTMLElement) || !(event.target instanceof HTMLElement)) {
      throw new Error('Wrong parent type');
    }
    //TODO adapt for many
    putOnFirstFreePosition(parent, event.target);
  });
  const wordsBoxCell = new Component({
    className: 'words-box-cell ',
  });
  wordsBoxCell.setAttribute('id', `word-cell-${wordIndex}`);
  wordsBoxCell.setAttribute('draggable', 'false');
  wordsBoxCell.addListener('dragstart', () => {
    return;
  });
  wordsBoxCell.appendChildren([wordCard]);
  wordsBox?.appendChild(wordsBoxCell.getNode());
}
