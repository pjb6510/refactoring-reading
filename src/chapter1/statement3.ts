import { Invoice } from './invoices';
import { Plays } from './plays';
import { StatementData } from './StatementData';
import { createStatementData } from './createStatementData';

export function statement3(invoice: Invoice, plays: Plays) {
  function usd(aNumber: number | undefined) {
    if (aNumber == null) {
      throw new Error('aNumber is undefined');
    }

    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(aNumber / 100);
  }

  function renderPlainText(data: StatementData) {
    let result = `청구 내역 (고객명: ${data.customer})\n`;
    for (let perf of data.performances) {
      if (perf.play == null || perf.amount == null) {
        throw new Error('data is undefined');
      }

      result += `${perf.play.name}: ${usd(perf.amount)} (${perf.audience}석)\n`;
    }

    result += `총액: ${usd(data.totalAmount)}\n`;
    result += `적립 포인트: ${data.totalVolumeCredits}점\n`;

    return result;
  }

  return renderPlainText(createStatementData(invoice, plays));
}
