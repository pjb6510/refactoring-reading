import { Invoice, Performance } from './invoices';
import { Plays } from './plays';

// 함수 추출하기!

export function statement2(invoice: Invoice, plays: Plays) {
  // 1. switch문 추출
  function amountFor(aPerformance: Performance) {
    let result = 0;

    switch (playFor(aPerformance).type) {
      case 'tragedy': // 비극
        result = 40000;

        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30);
        }

        break;
      case 'comedy': // 희극
        result = 30000;

        if (aPerformance.audience > 20) {
          result += 10000 + 500 * (aPerformance.audience - 20);
        }

        result += 300 * aPerformance.audience;

        break;
      default:
        throw new Error(`알 수 없는 장르: ${playFor(aPerformance).type}`);
    }

    return result;
  }

  // 2. 임시 변수를 질의 함수로 바꾸기
  function playFor(aPerformance: Performance) {
    return plays[aPerformance.playID];
  }

  // 5. 함수 추출하기
  function volumCreditsFor(perf: Performance) {
    let result = 0;

    result += Math.max(perf.audience - 30, 0);
    if (playFor(perf).type === 'comedy') {
      result += Math.floor(perf.audience / 5);
    }

    return result;
  }

  // 6. 임시변수 함수로 추출하기
  // format = new Intl... format
  // -> function { return ...format(aNumber) }
  function usd(aNumber: number) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(aNumber / 100);
  }

  function totalVolumeCredits() {
    let result = 0;
    for (let perf of invoice.performances) {
      result += volumCreditsFor(perf);
    }
    return result;
  }

  // 11. totalAmount를 함수로 분리 (totalVolumeCredits과 마찬가지)
  //  반복문 쪼개기
  //  문장 슬라이드하기
  //  함수 추출하기
  //  변수 인라인하기
  function totalAmount() {
    let result = 0;
    for (let perf of invoice.performances) {
      result += amountFor(perf);
    }
    return result;
  }

  let result = `청구 내역 (고객명: ${invoice.customer})\n`;

  for (let perf of invoice.performances) {
    // 3.변수 인라인하기
    // const play = plays[perf.playID]
    //  -> playFor(perf)

    // 4. 변수 인라인하기
    // thisAmount
    //  -> amountFor(perf)
    result += `${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience}석)\n`;
  }

  // 7. 반복문 쪼개기
  //  for문 2개로

  // 8. 문장 슬라이드하기
  //  volumCredit을 for문 앞으로 이동

  // 9. 임시 변수를 질의 함수로 바꾸기
  //  for문 통째로 함수로 변경

  result += `총액: ${usd(totalAmount())}\n`;

  // 10. 변수를 인라인
  // const volumeCredits = totalVolumeCredits()
  //  -> totalVolumeCredits()
  result += `적립 포인트: ${totalVolumeCredits()}점\n`;
  return result;
}
