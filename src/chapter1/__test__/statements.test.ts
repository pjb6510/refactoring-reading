import { invoice } from '../invoices';
import { plays } from '../plays';
import { statement1 } from '../statement1';
import { statement2 } from '../statement2';

test('statement1 test', () => {
  expect(statement1(invoice, plays)).toBe(
    '청구 내역 (고객명: BigCo)\n' +
      'Hamlet: $650.00 (55석)\n' +
      'As You Like It: $580.00 (35석)\n' +
      'Othello: $500.00 (40석)\n' +
      '총액: $1,730.00\n' +
      '적립 포인트: 47점\n'
  );
});

test('statement2 test', () => {
  expect(statement2(invoice, plays)).toBe(
    '청구 내역 (고객명: BigCo)\n' +
      'Hamlet: $650.00 (55석)\n' +
      'As You Like It: $580.00 (35석)\n' +
      'Othello: $500.00 (40석)\n' +
      '총액: $1,730.00\n' +
      '적립 포인트: 47점\n'
  );
});