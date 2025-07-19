
export interface ClientBasicAll {
  id: number;
  firstName: string;
  lastName: string;
  active: boolean;

}

export interface OrderResponse {
  id: number;
  description: string;
  source: string;
  address: string;
  dateOrder: string;
  state: string;
  orderNumber: string;
  orderNumberTemporary: string;
  canceled: boolean;
  active: boolean;
  client: ClientBasicAll;
}

