const mongoose = require('mongoose');

const Product = require('./models/product')

mongoose.connect('mongodb://localhost:27017/farmStand', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        console.log("Mongo Establised");
    })
    .catch((e)=>{
        console.log(e, "mongOOPSe!");
    })

// const p = new Product ({
//     name:"Ruby Grapefruit",
//     price:1.99,
//     category:'fruit'
// })

// p.save()
//     .then(p=>{
//         console.log(p);
//     })
//     .catch(e=>{
//         console.log(e);
//     })

const seedProducts = [
    {
        name: 'Fairy Eggplant',
        price:1.00,
        category:'vegetable'
    },
    {
        name: 'Organic Goddess Melon',
        price:4.99,
        category:'fruit'
    },{
        name: 'Chocolate whole milk',
        price:1.00,
        category:'dairy'
    }
]

Product.insertMany(seedProducts);