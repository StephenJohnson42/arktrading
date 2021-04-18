import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Trades {
  readonly id: string;
  readonly FUND?: string;
  readonly Direction?: string;
  readonly Ticker?: string;
  readonly CUSIP?: string;
  readonly Name?: string;
  readonly Shares?: number;
  readonly percETF?: number;
  readonly entryDate?: string;
  readonly exitDate?: string;
  readonly entryPrice?: number;
  readonly exitPrice?: number;
  readonly percGain?: number;
  constructor(init: ModelInit<Trades>);
  static copyOf(source: Trades, mutator: (draft: MutableModel<Trades>) => MutableModel<Trades> | void): Trades;
}