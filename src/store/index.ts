export interface StoreType {
  state: {
    color?: string;
    data?: { userId: number };
  };
}

export class Store implements StoreType {
  state: StoreType["state"] = {
    color: "red",
  };

  constructor(initialState?: StoreType["state"]) {
    if (initialState) this.state = initialState;
  }
}
