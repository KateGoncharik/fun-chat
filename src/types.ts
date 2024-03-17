export type Round = {
  levelData: Art;
  words: Word[];
};
type Art = {
  name: string;
  imageSrc: string;
  cutSrc: string;
  author: string;
  year: string;
};

export type Word = {
  audioExample: string;
  textExample: string;
  textExampleTranslate: string;
  id: number;
  word: string;
  wordTranslate: string;
};
