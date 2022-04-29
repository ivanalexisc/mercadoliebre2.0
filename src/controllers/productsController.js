const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

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
		let newId = 0;
    	products.forEach((item) => {
      	if (item.id > newId) {
        	newId = item.id;
      }
    });
    res.render("product-create-form", { newId });
	},
	
	// Create -  Method to store
	store: (req, res) => {
		let idDef = req.params.id;

		
		let newProduct = {
			id: idDef,
			...req.body,
			image:"image.png",
		};
		console.log(newProduct);
		products.push(newProduct);
		fs.writeFileSync(productsFilePath, JSON.stringify(products), "utf-8");
		res.redirect('/products')
		
		
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