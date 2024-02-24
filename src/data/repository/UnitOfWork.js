import ProductRepository from "./ProductRepository.js";

class UnitOfWork{
    constructor(){
        this.Products = new ProductRepository();    
    }
}

export default UnitOfWork;