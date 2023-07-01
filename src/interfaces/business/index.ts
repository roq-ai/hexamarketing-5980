import { ArticleInterface } from 'interfaces/article';
import { LandingPageInterface } from 'interfaces/landing-page';
import { RenamedpackageInterface } from 'interfaces/renamedpackage';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface BusinessInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  article?: ArticleInterface[];
  landing_page?: LandingPageInterface[];
  Renamedpackage?: RenamedpackageInterface[];
  user?: UserInterface;
  _count?: {
    article?: number;
    landing_page?: number;
    Renamedpackage?: number;
  };
}

export interface BusinessGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
