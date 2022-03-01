import { Invoice } from '../common/invoices';
import { Plays } from '../common/plays';
import { StatementData } from './StatementData';
import { createStatementData } from './createStatementData';

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

export function htmlStatement(invoice: Invoice, plays: Plays) {
  return renderHtml(createStatementData(invoice, plays));
}

export function renderHtml(data: StatementData) {
  let result = `<h1>청구 내역 (고객명: ${data.customer})</h1>\n`;
  result += '<table>\n';
  result += '<tr><th>연극</th><th>좌석수</th><th>금액</th></tr>';

  for (let perf of data.performances) {
    if (perf.play == null) {
      throw new Error('play is undefined');
    }

    result += ` <tr><td>${perf.play.name}</td><td>(${perf.audience}석)</td>`;
    result += `<td>${usd(perf.amount)}</td></tr>\n`;
  }

  result += '</table>\n';
  result += `<p>총액: <em>${usd(data.totalAmount)}</em></p>\n`;
  result += `<p>적립 포인트: <em>${data.totalVolumeCredits}</em>점</p>\n`;

  return result;
}

export function statement3(invoice: Invoice, plays: Plays) {
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
