import type { ColumnType } from 'kysely';

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface Carriers {
  active: Generated<boolean>;
  created_at: Generated<Timestamp>;
  fantasy_name: string;
  federal_tax_id: string;
  id: string;
  name: string;
  updated_at: Timestamp | null;
}

export interface InvoiceDescriptions {
  created_at: Generated<Timestamp>;
  description: string;
  id: string;
  invoice: string;
  updated_at: Timestamp | null;
}

export interface Invoices {
  amount: number;
  created_at: Generated<Timestamp>;
  id: string;
  key_nfe: string;
  number_nfe: string;
  series: string;
  shipment_package: string;
  updated_at: Timestamp | null;
}

export interface ShipmentAddresses {
  city: string;
  created_at: Generated<Timestamp>;
  ibge: string;
  id: string;
  neighborhood: string;
  state: string;
  street: string;
  updated_at: Timestamp | null;
  zipcode: string;
}

export interface ShipmentPackages {
  city: string;
  complement: Generated<string | null>;
  created_at: Generated<Timestamp>;
  heightCm: number;
  id: string;
  lengthCm: number;
  neighborhood: string;
  number: string;
  shipment: string;
  state: string;
  street: string;
  tracking_code: string;
  updated_at: Timestamp | null;
  weight: number;
  widthCm: number;
  zipcode: string;
}

export interface Shipments {
  amount: string;
  carrier: string;
  created_at: Generated<Timestamp>;
  id: string;
  updated_at: Timestamp | null;
  weight: string;
}

export interface DB {
  carriers: Carriers;
  invoice_descriptions: InvoiceDescriptions;
  invoices: Invoices;
  shipment_addresses: ShipmentAddresses;
  shipment_packages: ShipmentPackages;
  shipments: Shipments;
}
