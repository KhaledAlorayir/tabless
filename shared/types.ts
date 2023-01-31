export interface Link_type {
  id: number;
  created_at: string;
  type: string;
}

export interface Link {
  id: string;
  created_at: string;
  uid: string;
  tid: number;
  title: string;
  url: string;
}

export interface Link_Insert {
  title: string;
  url: string;
  type: number;
}
export interface Link_Update {
  title: string;
  url: string;
  type: number;
  id: string;
}

export interface Alert {
  message: string;
  type: "ERR" | "SUC";
}

export interface Filter {
  query: string;
  type: 0 | 1 | 2;
}

export type AutoAdd = {
  url: string;
  title: string;
} | null;

export interface DomainList {
  domain: string;
  urls: Link[];
}
