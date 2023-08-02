import { Router } from "express";
import ProductManager from "../ProductManager.js"

const productsRouter = Router();
const productManager = new ProductManager();

productsRouter.get("/", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit);
    const products = await productManager.getProducts();

    if (limit) {
      let arrayProducts = [...products];
      const productsLimit = arrayProducts.slice(0, limit);
      return res.send(productsLimit);
    } else {
      return res.send(products);
    }
  } catch (error) {
    console.log("Lo sentimos, ocurrio un error");
  }
});

productsRouter.get("/", async (req, res) => {
    try {
      const limit = Number(req.query.limit);
      const productsList = await productManager.getProducts();
      if (limit) {
        let arrayProds = [...productsList];
        const productsLimit = arrayProds.slice(0, limit);
        return res.send(productsLimit);
      } else {
        res.send(productsList);
      }
    } catch (error) {
      console.log(error);
    }
  });
  
productsRouter.get("/:pid", async (req, res) => {
    try {
      const pid = req.params.pid;
      const products = await productManager.getProducts();
      const existProduct = products.find((prod) => prod.id === pid);
      const response = existProduct ? existProduct : { error: `Lo sentimos... No se ha encontrado el producto con el id: ${pid} en la base de datos`,};
      res.status(existProduct ? 200 : 400).send(response);
    } catch (error) {
      console.log("Lo sentimos, ocurrio un error");
    }
});

productsRouter.post ("/", (req, res) => {
    let {title, description, code, price, status, stock, category, thumbnail } = req.body;

    if(!title){
        res.status(400).send({status:"error", message: "Error! No se cargo el campo Title"})
        return false;
    }

    if(!description){
        res.status(400).send({status:"error", message: "Error! No se cargo el campo Description"})
        return false;
    }

    if(!code){
        res.status(400).send({status:"error", message: "Error! No se cargo el campo Code"})
        return false;
    }

    if(!price){
        res.status(400).send({status:"error", message: "Error! No se cargo el campo Price"})
        return false;
    }

    status = !status && true; 
    
    if(!stock){
        res.status(400).send({status:"error", message: "Error! No se cargo el campo Stock"})
        return false;
    }
    
    if(!category){
        res.status(400).send({status:"error", message: "Error! No se cargo el campo Category"})
        return false;
    }

    if(!thumbnail){
        res.status(400).send({status:"error", message: "Error! No se cargo el campo Thumbnails"})
        return false;
    }else if ((!Array.isArray(thumbnail)) || (thumbnail.length == 0)){
        res.status(400).send({status:"error", message: "Error debe ingresar al menos una imagen"})
        return false;
    }
    if (productManager.addProduct({title, description, code, price, status, stock, category, thumbnail})) {
        res.send({status:"ok", message: "Producto agregado correctamente"});
    } else {
        res.status(500).send({status:"error", message: "Error! No se cargo el producto"});
    }
        
});

productsRouter.put ("/:pid", (req, res) => {
    let pid = Number(req.params.pid);
    let {title, description, code, price, status, stock, category, thumbnail } = req.body;

    if(!title){
        res.status(400).send({status:"error", message: "Error! No se cargo el campo Title"})
        return false;
    }

    if(!description){
        res.status(400).send({status:"error", message: "Error! No se cargo el campo Description"})
        return false;
    }

    if(!code){
        res.status(400).send({status:"error", message: "Error! No se cargo el campo Code"})
        return false;
    }

    if(!price){
        res.status(400).send({status:"error", message: "Error! No se cargo el campo Price"})
        return false;
    }

    status = !status && true; 
    
    if(!stock){
        res.status(400).send({status:"error", message: "Error! No se cargo el campo Stock"})
        return false;
    }
    
    if(!category){
        res.status(400).send({status:"error", message: "Error! No se cargo el campo Category"})
        return false;
    }

    if(!thumbnail){
        res.status(400).send({status:"error", message: "Error! No se cargo el campo Thumbnails"})
        return false;
    }else if ((!Array.isArray(thumbnail)) || (thumbnail.length == 0)){
        res.status(400).send({status:"error", message: "Error debe ingresar al menos una imagen"})
        return false;
    }
    if (productManager.updateProduct(pid, {title, description, code, price, status, stock, category, thumbnail})) {
        res.send({status:"ok", message: "Producto actualizado correctamente"});
    } else {
        res.status(500).send({status:"error", message: "Error! No se actualizo el producto"});
    }
        
});

productsRouter.delete ("/:pid", (req, res) => {
    let pid = Number(req.params.pid);

    if (productManager.deleteProduct(pid)) {
        res.send({status:"ok", message: "Producto elimino correctamente"});
    } else {
        res.status(500).send({status:"error", message: "Error! No se elimino el producto"});
    }

});


export default productsRouter;