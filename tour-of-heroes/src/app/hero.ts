export interface Hero {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;

}

export interface HeroAPI {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: Hero[];
  ad: any;
}

export class userRegister {
  id?: string
  name: string;
  job: string;
  createdAt?: string;

}
