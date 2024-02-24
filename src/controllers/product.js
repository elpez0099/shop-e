import UnitOfWork from '../data/repository/UnitOfWork.js';


class ProductController {
    constructor(){
        const unitOfWork = new UnitOfWork();
        this._model = unitOfWork.Products;
    }

    getProducts = async (req, res) => {
        const products = await this._model.get();
        res.status(200).json(products);
    }

    getProductById = async (req, res) => {
        const id = req.params.id;
        const product = await this._model.getById(id);
        res.status(200).json(product);
    }

    createProduct = async (req, res) => {
        const body = req.body;
        const product = await this._model.create(body);
        res.status(201).json(product);
    }

    updateProduct = async (req, res) => {
        const id = req.params.id;
        const body = req.body;
        const product = await this._model.update(id, body);
        res.status(200).json(product);
    }

    deleteProduct = async (req, res) => {
        const id = req.params.id;
        await this._model.delete(id);
        res.status(200).json({message: 'Item deleted!'});
    }
}


export default ProductController;