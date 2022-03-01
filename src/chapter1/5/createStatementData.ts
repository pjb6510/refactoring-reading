import { Invoice, Performance } from '../common/invoices';
import { Plays, Play } from '../common/plays';
import { PerformanceForData, StatementData } from '../common/StatementData';

function createPerformanceCalculator(aPerformance: Performance, aPlay: Play) {
  switch (aPlay.type) {
    case 'tragedy':
      return new TragedyCalculator(aPerformance, aPlay);
    case 'comedy':
      return new ComedyCalculator(aPerformance, aPlay);
    default:
      throw new Error(`알 수 없는 장르: ${aPlay.type}`);
  }
}

abstract class PerformanceCalculator {
  constructor(public performance: Performance, public play: Play) {}

  abstract getAmount(): number;

  // 일반적인 경우는 슈퍼클래스에 남겨두고, 장르별로 달라질 때만 서브클래스에서 오버라이드하여 계산
  getVolumeCredits() {
    return Math.max(this.performance.audience - 30, 0);
  }
}

class TragedyCalculator extends PerformanceCalculator {
  getAmount(): number {
    let result = 40000;

    if (this.performance.audience > 30) {
      result += 1000 * (this.performance.audience - 30);
    }

    return result;
  }
}

class ComedyCalculator extends PerformanceCalculator {
  getAmount(): number {
    let result = 30000;

    if (this.performance.audience > 20) {
      result += 10000 + 500 * (this.performance.audience - 20);
    }

    result += 300 * this.performance.audience;

    return result;
  }

  getVolumeCredits(): number {
    return super.getVolumeCredits() + Math.floor(this.performance.audience / 5);
  }
}

export function createStatementData5(invoice: Invoice, plays: Plays) {
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
      const calculator = createPerformanceCalculator(aPerformance, playFor(aPerformance));

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
