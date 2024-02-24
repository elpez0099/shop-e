import BaseRepository from './BaseRepository.js';
import Product from '../models/product.js';

class ProductRepository extends BaseRepository{
    constructor(){
        super(Product);
    }
}

export default ProductRepository;