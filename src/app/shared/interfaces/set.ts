// All Set Interfaces

export interface LedgerSetInterface {
  id: number;
  name: string;
  groupId: number;
  country: number;
  stateId: number;
  aliasName?: string;
  printName?: string;
  bwd?: boolean;
  description?: string;
  gst?: string;
  pan?: string;
  contactPerson?: string;
  address1?: string;
  address2?: string;
  address3?: string;
  fax?: string;
  phone?: string;
  pinCode?: string;
  mobile?: string;
  email?: string;
  website?: string;
}

export interface LedgerGroupSetInterface {
  id: number;
  name: string;
  groupId: number;
  aliasName?: string;
  printName?: string;
}
