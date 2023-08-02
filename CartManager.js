import fs from "fs";


class CartManager {
  constructor() {
    this.carts = [];
    this.path= "Carrito.json";
    this.createFile();
    this.productoIdCounter = 0;
    this.product = {
      id: this.productoIdCounter,
      title: "",
      description: "",
      price: 0,
      thumbnail: "",
      code: 0,
      stock: 0,
    };
  }

  async createFile(){
    if(!fs.existsSync(this.path)){
        fs.writeFileSync(this.path, JSON.stringify(this.carts));
    }

  }

  newCart(){
    this.carts.push({ products: []});
    this.saveCart();
    console.log("Cart creado");

    return true;
  }


  async getCart(id) {    
    this.carts = JSON.parse(fs.readFileSync(this.path, "utf-8"));

    const cart = this.carts.find((cart) => cart.id === id);

    if (!cart) {
      throw new Error("El producto no se encuentra");
    }

    return cart;
  }

  async addProductToCart(cid, pid) {
    this.carts = this.getCarts();
    const cart = this.carts.find (item => item.id === cid) ;
    let product = cart.products.find (item => item.product === pid) ;

    if (product >-1) {
      product.quantity += 1; 
    } else{
      cart.products.push({product:pid, quantity:1});
    }

    this.saveCart();
    console.log("Producto agregado");

    return true;
  }

  async getProducts() {
    this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));

    return this.products;
  }

  async getCarts() {
    this.Carts = JSON.parse(fs.readFileSync(this.path, "utf-8"));

    return this.Carts;
  }


  /*generateId() {
    let max = 0;
    let carts = this.getCarts();

    carts.forEach(item => {
      if (item.id > max) {
        max = item.id;
      }
    });

    return max+1;
  }*/

  saveCart() {
    fs.writeFileSync(this.path, JSON.stringify(this.carts));
  }
}

export default CartManager;