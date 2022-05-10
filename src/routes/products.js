// ************ Require's ************
const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

// ************ Controller Require ************
const productsController = require('../controllers/productsController');
// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../../public/images/products'))
    },
    filename: function (req, file, cb) {
        console.log(file);
      cb(null, file.fieldname + '-' + Date.now()+ path.extname(file.originalname))
    }
  });
   
  var upload = multer({ 
      storage,

      //VALIDATE IMAGE
      fileFilter: (req,file,cb) => {
          const acceptedExtensions = ['.jpg', '.jpeg', '.png'];
          const ext = path.extname(file.originalname);
          if(!acceptedExtensions.includes(ext)){
              req.file = file;
          }
          cb(null, acceptedExtensions.includes(ext));
      }

    });

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

// /*** CREATE ONE PRODUCT ***/ 
 router.get('/create', productsController.create); 
 router.post('/create', upload.single('image') ,productsController.store); 


// /*** GET ONE PRODUCT ***/ 
 router.get('/detail/:id/', productsController.detail); 

// /*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsController.edit); 
router.put('/edit/:id', productsController.update); 


// /*** DELETE ONE PRODUCT***/ 
 router.delete('/delete/:id', productsController.destroy); 


module.exports = router;
