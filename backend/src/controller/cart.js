
const { isValidObjectId } = require('mongoose');
const Cart = require('../models/cart');
const { db } = require('../models/user');
const user = require('../models/user');


exports.addItem = (req, res) => {

    if(typeof req.body.items.quantity=='undefined'){
        req.body.items.quantity = 1;
    }

    const item = {
        product: req.body.items.product,
        quantity: req.body.items.quantity,
    };

    Cart.findOne({ user: req.user._id })
    .exec(async (error, cart) => {
        if(error) return res.status(400).json({ error });
        if(cart){
            if (cart.items.find(c => c.product == item.product)) {

                Cart.findOneAndUpdate(
                {   //filter
                    'user': req.user._id,
                    items: {
                        $elemMatch: { product: item.product }
                    }
                },{ //update 
                    $inc: { 'items.$.quantity': item.quantity }
                },{ 
                    returnNewDocument: true 
                }, (error, cart) => {
                    if(error) return res.status(400).json({ error });
                    if(cart){
                        return res.status(201).json({ cart });
                    }
                });
            }else{
                cart.items.push(item);
                cart.save((error, cart) => {
                    if(error) return res.status(400).json({ error });
                    if(cart){
                        return res.status(201).json({ cart });
                    }
                })
            }
        }else{
            const cart = new Cart({
                user: req.user._id,
                items: item
            });
            cart.save((error, cart) => {
                if(error) return res.status(400).json({ error });
                if(cart){
                    return res.status(201).json({ cart });
                }
            });
        }
    });
}

exports.getCart = (req, res) => {
    res.json({ message: 'cart' });

}
