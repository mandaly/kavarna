const API_NAME = 'zuzana';
const API_BASE = `https://czechitas.twoways.cz/api/${API_NAME}`;

export default class DataStore {
  constructor() {
    this.categories = [];
    this.products = [];
    this.order = {};
  }

  async loadData() {
    await Promise.all([
      this.getCategories(),
      this.getProducts()
    ]);
  }

  async getCategories() {
    try {
      const response = await fetch(`${API_BASE}/categories`);
      const data = await response.json();
      this.categories = data;
    } catch {
      console.error('Nepovedlo se načíst kategorie');
    }
  }

  async getProducts() {
    try {
      const response = await fetch(`${API_BASE}/products`);
      const data = await response.json();
      this.products = data;
    } catch {
      console.error('Nepovedlo se načíst produkty');
    }
  }

  getProductById(id) {
    return this.products.find(product => product.id == id);
  }

  async sendOrder(){

    //sestavíme objekt objednávky pro odeslání na server
    const data = {
      status: 0,
      position: 1,
      products: []
    };

    for(let id in this.order){
      data.products.push(
        {
          product_id: id,
          amount: this.order[id]
        }
      );
    }

    await fetch(`${API_BASE}/orders`, {
      headers: {
        "Accept": "application/json",
        "Content-type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(data)
    })

    //na CRUD api můžeš:
    //create --> POST
    //read --> GET
    //update --> PATCH
    //delete --> DELETE
  }

}
