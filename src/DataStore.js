export default class DataStore {
  static getInstance() {
    if (!DataStore.instance) {
      DataStore.instance = new DataStore();
    }
    return DataStore.instance;
  }

  constructor() {
    this.map = new Map();

    console.log("Data store created");
  }

  put(key, value) {
    this.map.set(key, value);

    // Enable method chaining
    // return this;
  }

  get(key) {
    return this.map.get(key);
  }

  clear() {
    this.map.clear();

    console.log("DATASTORE CLEARED");
    console.log("---------------------------------------");
  }
}
