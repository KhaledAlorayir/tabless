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

export interface Alert {
  message: string;
  type: "ERR" | "SUC";
}
