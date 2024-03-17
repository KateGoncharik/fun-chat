import { Component } from './component';
import { handleDrop } from './training';

export function fillResultRow(resultBoxRow: Component, words: string[]): void {
  words.forEach((_, wordIndex) => {
    const resultRowCell = new Component({ className: 'result-row-cell' });
    resultRowCell.setAttribute('id', `result-cell-${wordIndex}`);
    resultBoxRow.append(resultRowCell);

    resultRowCell.addListener('dragover', (event) => {
      event.preventDefault();
      resultRowCell.getNode().classList.add('drop-hover');
    });

    resultRowCell.addListener('dragleave', (event) => {
      event.preventDefault();
      resultRowCell.getNode().classList.remove('drop-hover');
    });
    resultRowCell.addListener('drop', handleDrop);
  });
}
