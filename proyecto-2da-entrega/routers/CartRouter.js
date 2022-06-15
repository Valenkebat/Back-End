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

    this.post('/',(req, res) => {
        let a = new CartFileDAO();
        let b = new CartFirebaseDAO();
        let c = new CartMongoDAO();
        res.send({a,b,c});
    })

    this.get('/',(req, res) => {
        res.send(CartFileDAO.getAll(),CartFirebaseDAO.getAll(),CartMongoDAO.getAll());})
    
    

    this.get('/:id',(req, res) => {
        res.send(CartFileDAO.getById(req.params.id),CartFirebaseDAO.getById(req.params.id),CartMongoDAO.getById(req.params.id));
    
        })

    }

}

export default CartRouter;