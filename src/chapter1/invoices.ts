export interface Performance {
  playID: string;
  audience: number;
}

export interface Invoice {
  customer: string;
  performances: Performance[];
}

export const invoice: Invoice = {
  customer: 'BigCo',
  performances: [
    {
      playID: 'hamlet',
      audience: 55,
    },
    {
      playID: 'as-like',
      audience: 35,
    },
    {
      playID: 'othello',
      audience: 40,
    },
  ],
};
