import { Invoice, Performance } from '../common/invoices';
import { Plays, Play } from '../common/plays';
import { PerformanceForData, StatementData } from '../common/StatementData';

class PerformanceCalculator {
  constructor(public performance: Performance, public play: Play) {}

  getAmount() {
    let result = 0;

    switch (this.play.type) {
      case 'tragedy':
        result = 40000;

        if (this.performance.audience > 30) {
          result += 1000 * (this.performance.audience - 30);
        }

        break;
      case 'comedy':
        result = 30000;

        if (this.performance.audience > 20) {
          result += 10000 + 500 * (this.performance.audience - 20);
        }

        result += 300 * this.performance.audience;

        break;
      default:
        throw new Error(`알 수 없는 장르: ${this.play.type}`);
    }

    return result;
  }

  getVolumeCredits() {
    let result = 0;
    result += Math.max(this.performance.audience - 30, 0);
    if (this.play.type === 'comedy') {
      result += Math.floor(this.performance.audience / 5);
    }

    return result;
  }
}

export function createStatementData(invoice: Invoice, plays: Plays) {
  function playFor(aPerformance: Performance) {
    return plays[aPerformance.playID];
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
      const calculator = new PerformanceCalculator(aPerformance, playFor(aPerformance));

      const result: PerformanceForData = {
        ...aPerformance,
      };
      result.play = calculator.play;
      result.amount = calculator.getAmount();
      result.volumCredits = calculator.getVolumeCredits();

      return result;
    }),
  };
  statementData.totalAmount = totalAmount(statementData);
  statementData.totalVolumeCredits = totalVolumeCredits(statementData);

  return statementData;
}
