const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require('method-override');


const Product = require("./models/product");
const categories = ['fruit','vegetable','dairy'];


mongoose.connect("mongodb://localhost:27017/farmStand", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongo Establised");
  })
  .catch((e) => {
    console.log(e, "mongOOPSe!");
  });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true })); //Parses form body in POST request so that req.body is not undefined and actually gives the data.
app.use(methodOverride('_method'));


app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  const foundProduct = await Product.findById(id);
  res.render("products/show", { foundProduct });
});

app.put('/products/:id', async (req,res)=>{
  const {id} = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, {runValidators:true, new:true});
  res.redirect(`/products/${product._id}`); 
});


app.get("/products/new", (req, res) => {
  res.render("products/new",{categories});
});

app.post("/products", async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    console.log(newProduct);  
    res.redirect(`products/${newProduct.id}`);
});

app.get("/products", async (req, res) => {
  const {category} = req.query;
  if(category){
    const products = await Product.find({category});  
    res.render("products/index", { products,category });
  }else{
    const products = await Product.find({});
    res.render("products/index", { products,category:"All" });
  }
});

app.get('/',(req,res)=>{
  res.redirect('/products')
})

app.delete("/products/:id", async (req, res) => {
  const {id} = req.params;
  const deletedProduct = await Product.findByIdAndDelete(id);
  res.redirect('/products');
});

app.get("/products/:id/edit", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render("products/edit", { product,categories });
});

app.listen(3000, () => {
  console.log("Listening on port 3k!");
});
