import express from 'express';
import CartFileDAO from '../dao/cart/CartFileDAO.js';
import CartFirebaseDAO from '../dao/cart/CartFirebaseDAO.js';
import CartMongoDAO from '../dao/cart/CartMongoDAO.js';
import ProductFileDAO from '../dao/product/ProductFileDAO.js';
import ProductFirebaseDAO from '../dao/product/ProductFirebaseDAO.js';
import ProductMongoDAO from '../dao/product/ProductMongoDAO.js';



class CartRouter extends express.Router {
  constructor() {
    super();
    this.CartFileDAO = new CartFileDAO();
    this.CartFirebaseDAO = new CartFirebaseDAO();
    this.CartMongoDAO = new CartMongoDAO();
    this.ProductFileDAO = new ProductFileDAO();
    this.ProductFirebaseDAO = new ProductFirebaseDAO();
    this.ProductMongoDAO = new ProductMongoDAO();


    this.post('/',(req, res) => {
        res.send(this.CartFileDAO.new(), 
        this.CartFirebaseDAO.new()), 
        this.CartMongoDAO.new()
    });


    this.get('/',(req, res) => {
        res.send(
            this.CartFileDAO.getAll(),
            this.CartFirebaseDAO.getAll(),
            this.CartMongoDAO.getAll(),
        );})
    
    

    this.get('/:id',(req, res) => {
        res.send(
            this.CartFileDAO.getById(req.params.id),
            this.CartFirebaseDAO.getById(req.params.id),
            this.CartMongoDAO.getById(req.params.id),
            ); 
        })

    

    this.post('/:id/product/:id',(req, res) => {
        let productA = this.ProductFileDAO.getById(req.params.id);
        let productB = this.ProductFirebaseDAO.getById(req.params.id);
        let productC = this.ProductMongoDAO.getById(req.params.id);
        res.sed(
            this.CartFileDAO.addProduct(req.params.id, productA),
            this.CartFirebaseDAO.addProduct(req.params.id, productB),
            this.CartMongoDAO.addProduct(req.params.id, productC),
        );
        }
    )

    this.delete('/:id/product/:id',(req, res) => {
        let productA = this.ProductFileDAO.getById(req.params.id);
        let productB = this.ProductFirebaseDAO.getById(req.params.id);
        let productC = this.ProductMongoDAO.getById(req.params.id);
        res.sed(
            this.CartFileDAO.removeProduct(req.params.id, productA),
            this.CartFirebaseDAO.removeProduct(req.params.id, productB),
            this.CartMongoDAO.removeProduct(req.params.id, productC),
        );
        })


}}

export default CartRouter;