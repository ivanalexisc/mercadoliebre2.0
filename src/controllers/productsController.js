const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
let guardar = (products) => {
	fs.writeFileSync(
	  path.join(__dirname, "../data/productsDataBase.json"),
	  JSON.stringify(products, null, " "),
	  "utf-8"
	);
  };

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render('products',{products})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		for(let i=0; i<products.length;i++){
			if(products[i].id == req.params.id)
			res.render('detail',{producto:products[i],toThousand})
		}
	},

	// Create - Form to create
	create: (req, res) => {
	
    res.render("product-create-form",);
	},
	
	// Create -  Method to store
	store: (req, res) => {
		const { name, price, discount, category, description } = req.body;
		let product = {
		  id: products[products.length - 1].id + 1, 
		  name,
		  description,
		  price,
		  discount,
		  image: "default-image.png",
		  category,
		};
		products.push(product);
		guardar(products);
		res.redirect('/products');

       
    },
	// Update - Form to edit
	edit: (req, res) => {
	let editProduct = products.find(producto => producto.id==req.params.id);
	res.render('product-edit-form', {'editProduct': editProduct})	
		
	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
	}
};

module.exports = controller;