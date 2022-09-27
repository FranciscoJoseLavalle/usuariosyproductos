import { Router } from "express";
import userService from "../models/User.js";
import { isValidPassword } from '../utils.js'
import passport from "passport";
import productsService from "../models/Products.js";

const router = Router();

router.post('/register', passport.authenticate('register', { failureRedirect: '/api/sessions/registerfail' }), async (req, res) => {
    console.log(req.user)
    res.send({ status: "success", payload: req.user._id });
})
router.get('/registerfail', (req, res) => {
    console.log("Something is wrong");
    res.status(500).send({ status: "Error", error: "Server crashed" })
})
router.post('/login', passport.authenticate('login', { failureRedirect: '/api/sessions/loginfail' }), async (req, res) => {
    console.log(req.user);
    req.session.user = {
        name: req.user.name,
        email: req.user.email,
        id: req.user._id,
        products: req.user.products
    }
    res.send({ status: 'success', payload: req.session.user })
})
router.get('/loginfail', (req, res) => {
    res.status(500).send({ status: "error", error: "error in login" })
})

router.post('/products', async (req, res) => {
    console.log(req.body);

    let products = await productsService.findOne({userId: req.session.user.id}).lean()
    products.products.push(req.body);
    await productsService.findOneAndUpdate({userId: req.session.user.id}, {products: products.products})
    
    // await productsService.save();
    console.log(products.products);

    res.send({status: 'succes', payload: "Product added"})
})
export default router;