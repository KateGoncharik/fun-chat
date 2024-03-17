import level1 from '@/data/words/wordCollectionLevel1.json';
import type { Word } from './types';
import { drawLayout } from './layout';

export function loadFirstRound(): void {
  if (!level1.rounds[0]) {
    throw new Error('Rounds expected');
  }
  const round: Word[] = level1.rounds[0].words;
  const roundStagesSentences = round.map((el) => {
    return el.textExample;
  });
  drawLayout(roundStagesSentences);
}
