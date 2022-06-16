export interface StoreType {
    state: { color: string }
}

export class Store implements StoreType {
    state: StoreType['state'] = { color: "red" }

    constructor(initialState?: StoreType['state']) {
        if (initialState) this.state = initialState
    }
}