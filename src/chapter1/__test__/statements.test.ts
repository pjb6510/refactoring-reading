import { invoice } from '../common/invoices';
import { plays } from '../common/plays';
import { statement1 } from '../1/statement';
import { statement2 } from '../2/statement';
import { commonStatement } from '../common/commonStatement';
import { createStatementData3 } from '../3/createStatementData';
import { createStatementData4 } from '../4/createStatementData';
import { createStatementData5 } from '../5/createStatementData';

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

test('statement3 test', () => {
  expect(commonStatement(invoice, plays, createStatementData3)).toBe(
    '청구 내역 (고객명: BigCo)\n' +
      'Hamlet: $650.00 (55석)\n' +
      'As You Like It: $580.00 (35석)\n' +
      'Othello: $500.00 (40석)\n' +
      '총액: $1,730.00\n' +
      '적립 포인트: 47점\n'
  );
});

test('statement4 test', () => {
  expect(commonStatement(invoice, plays, createStatementData4)).toBe(
    '청구 내역 (고객명: BigCo)\n' +
      'Hamlet: $650.00 (55석)\n' +
      'As You Like It: $580.00 (35석)\n' +
      'Othello: $500.00 (40석)\n' +
      '총액: $1,730.00\n' +
      '적립 포인트: 47점\n'
  );
});

test('statement5 test', () => {
  expect(commonStatement(invoice, plays, createStatementData5)).toBe(
    '청구 내역 (고객명: BigCo)\n' +
      'Hamlet: $650.00 (55석)\n' +
      'As You Like It: $580.00 (35석)\n' +
      'Othello: $500.00 (40석)\n' +
      '총액: $1,730.00\n' +
      '적립 포인트: 47점\n'
  );
});
