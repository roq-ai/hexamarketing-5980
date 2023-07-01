import { BusinessInterface } from 'interfaces/business';
import { GetQueryInterface } from 'interfaces';

export interface LandingPageInterface {
  id?: string;
  name: string;
  content: string;
  business_id?: string;
  created_at?: any;
  updated_at?: any;

  business?: BusinessInterface;
  _count?: {};
}

export interface LandingPageGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  content?: string;
  business_id?: string;
}
