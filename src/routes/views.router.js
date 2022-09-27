import { Router } from 'express';
import productsService from '../models/Products.js';

const router = Router();

router.get('/',(req,res) => {
    res.render('register');
})
router.get('/login',(req,res) => {
    res.render('login');
})
router.get('/data',(req,res) => {
    if(!req.session.user) return res.redirect('/login');
    res.render('data', {user:req.session.user})
})
router.get('/products', async (req,res) => {
    let products = await productsService.findOne({userId: req.session.user.id}).lean()
    console.log(products);
    res.render('products', {products});
})
router.get('/api/products', async (req,res) => {
    let products = await productsService.findOne({userId: req.session.user.id}).lean()
    res.send(products);
})
export default router;