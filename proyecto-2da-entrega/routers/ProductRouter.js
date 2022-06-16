import express from 'express';
import ProductFileDAO from '../dao/product/ProductFileDAO.js';
import ProductFirebaseDAO from '../dao/product/ProductFirebaseDAO.js';
import ProductMongoDAO from '../dao/product/ProductMongoDAO.js';

class ProductRouter extends express.Router {
    constructor() {
        super();
        this.ProductFileDAO = new ProductFileDAO();
        this.ProductFirebaseDAO = new ProductFirebaseDAO();
        this.ProductMongoDAO = new ProductMongoDAO();
    
        this.get('/', (req, res) => {
            res.send(this.ProductFileDAO.getAll(), this.ProductFirebaseDAO.getAll(), this.ProductMongoDAO.getAll());
        }
        )
    
        this.get('/:id', (req, res) => {
            res.send(this.ProductFileDAO.getById(req.params.id), this.ProductFirebaseDAO.getById(req.params.id), this.ProductMongoDAO.getById(req.params.id));
        })

        this.post('/', (req, res) => {
            res.send(this.ProductFileDAO.new(req.body), this.ProductFirebaseDAO.new(req.body), this.ProductMongoDAO.new(req.body));
        })

        this.put('/:id', (req, res) => {
            res.send(this.ProductFileDAO.update(req.params.id, req.body), 
                    this.ProductFirebaseDAO.update(req.params.id, req.body), 
                    this.ProductMongoDAO.update(req.params.id, req.body)
                    );
        })

        this.delete('/:id', (req, res) => {
            res.send(
                this.ProductFileDAO.delete(req.params.id), 
                this.ProductFirebaseDAO.delete(req.params.id), 
                this.ProductMongoDAO.delete(req.params.id)
                );}
        )
    }

}

export default ProductRouter;