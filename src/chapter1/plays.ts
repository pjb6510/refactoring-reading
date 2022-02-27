export type PlayType = 'tragedy' | 'comedy';

export interface Play {
  name: string;
  type: PlayType;
}

export interface Plays {
  [title: string]: Play;
}

export const plays: Plays = {
  hamlet: { name: 'Hamlet', type: 'tragedy' },
  'as-like': { name: 'As You Like It', type: 'comedy' },
  othello: { name: 'Othello', type: 'tragedy' },
};
