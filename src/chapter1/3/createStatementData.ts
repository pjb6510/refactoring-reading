import { Invoice, Performance } from '../common/invoices';
import { Plays } from '../common/plays';
import { PerformanceForData, StatementData } from './StatementData';

export function createStatementData(invoice: Invoice, plays: Plays) {
  function amountFor(aPerformance: PerformanceForData) {
    let result = 0;

    switch (aPerformance.play?.type) {
      case 'tragedy':
        result = 40000;

        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30);
        }

        break;
      case 'comedy':
        result = 30000;

        if (aPerformance.audience > 20) {
          result += 10000 + 500 * (aPerformance.audience - 20);
        }

        result += 300 * aPerformance.audience;

        break;
      default:
        throw new Error(`알 수 없는 장르: ${aPerformance.play?.type}`);
    }

    return result;
  }

  function playFor(aPerformance: Performance) {
    return plays[aPerformance.playID];
  }

  function volumCreditsFor(aPerformance: PerformanceForData) {
    if (aPerformance.play == null) {
      throw new Error('aPerformance.play is undefined');
    }

    let result = 0;
    result += Math.max(aPerformance.audience - 30, 0);
    if (aPerformance.play.type === 'comedy') {
      result += Math.floor(aPerformance.audience / 5);
    }
    return result;
  }

  function totalAmount(data: StatementData) {
    return data.performances.reduce((total, p) => {
      if (p.amount == null) {
        throw new Error('perf.amount is undefined');
      }

      return total + p.amount;
    }, 0);
  }

  function totalVolumeCredits(data: StatementData) {
    return data.performances.reduce((total, p) => {
      if (p.volumCredits == null) {
        throw new Error('data is undefined');
      }

      return total + p.volumCredits;
    }, 0);
  }

  const statementData: StatementData = {
    customer: invoice.customer,
    performances: invoice.performances.map((aPerformance) => {
      const result: PerformanceForData = {
        ...aPerformance,
      };

      result.play = playFor(result);
      result.amount = amountFor(result);
      result.volumCredits = volumCreditsFor(result);

      return result;
    }),
  };
  statementData.totalAmount = totalAmount(statementData);
  statementData.totalVolumeCredits = totalVolumeCredits(statementData);

  return statementData;
}
