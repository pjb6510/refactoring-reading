import { Performance } from '../common/invoices';
import { Play } from '../common/plays';

export interface PerformanceForData extends Performance {
  play?: Play;
  amount?: number;
  volumCredits?: number;
}

export interface StatementData {
  customer: string;
  performances: PerformanceForData[];
  totalAmount?: number;
  totalVolumeCredits?: number;
}
