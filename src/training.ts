import { loadFirstRound } from './round';

export function startTraining(): void {
  loadFirstRound();
}

function findFirstFreePosition(cells: HTMLCollection): number {
  for (let cellIndex = 0; cellIndex < cells.length; cellIndex++) {
    if (!cells[cellIndex]?.children.length) {
      return cellIndex;
    }
  }
  throw new Error('Free position expected');
}

export function putOnFirstFreePosition(parent: HTMLElement, wordCard: HTMLElement): void {
  let parentFirstFreeCell;
  if (parent.classList.contains('words-box')) {
    const resultBox = document.querySelector('.result-box');
    const resultBoxCells = resultBox?.children[0]?.children;
    if (!resultBoxCells) {
      throw new Error('Result cells expected');
    }

    const firstFreePosition = findFirstFreePosition(resultBoxCells);

    parentFirstFreeCell = document.getElementById(`result-cell-${firstFreePosition}`);
    if (!parentFirstFreeCell) {
      throw new Error('Free cell expected');
    }
  } else if (parent.classList.contains('result-box')) {
    const wordsBox = document.querySelector('.words-box');
    const wordCells = wordsBox?.children;
    if (!wordCells) {
      throw new Error('Word cells expected');
    }
    const firstFreePosition = findFirstFreePosition(wordCells);
    parentFirstFreeCell = document.getElementById(`word-cell-${firstFreePosition}`);

    if (!parentFirstFreeCell) {
      throw new Error('Free cell expected');
    }
  }
  parentFirstFreeCell?.appendChild(wordCard);
}

export function putOnFirstFreePositionInWordsBox(resultsRowCellForDrop: HTMLElement): void {
  if (!resultsRowCellForDrop.children[0]) {
    throw new Error('Child expected');
  }
  const wordsBox = document.querySelector('.words-box');
  const wordCells = wordsBox?.children;
  if (!wordCells) {
    throw new Error('Word cells expected');
  }

  const wordsBoxFreePosition = findFirstFreePosition(wordCells);
  const wordsBoxCellFroDrop = document.getElementById(`word-cell-${wordsBoxFreePosition}`);
  wordsBoxCellFroDrop?.appendChild(resultsRowCellForDrop.children[0]);
}

export function handleDrop(event: Event): void {
  event.preventDefault();
  if (!(event instanceof DragEvent && event.target instanceof HTMLElement)) {
    return;
  }
  if (event.target.classList.contains('word')) {
    return;
  }
  const resultsRowCellForDrop = event.target;
  const cardId = event.dataTransfer?.getData('cardId');
  if (!cardId) {
    return;
  }
  const wordCard = document.getElementById(cardId);
  if (!wordCard) {
    throw new Error('No word card');
  }

  if (!(wordCard instanceof HTMLElement)) {
    return;
  }
  if (resultsRowCellForDrop.children[0]) {
    putOnFirstFreePositionInWordsBox(resultsRowCellForDrop);
  }
  resultsRowCellForDrop.replaceChildren(wordCard);
}
