import HttpClient from '@/libs/http/http.client';
import { BaseRepository } from '../base.repository';

export class BillingApi extends BaseRepository {
  getBillingUrl = async (): Promise<string> => {
    const billing = await HttpClient.get<{ portalUrl: string; message: string }>(
      `${this.apiUrl}/api/billing/portal`
    );
    return billing.portalUrl;
  };
}
