var express = require('express');
var router = express.Router();
var Car = require('../models/cars');
var multer = require('multer');
const { user } = require('pg/lib/defaults');

//image upload
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  }
});

var upload = multer({
  storage: storage,
}).single("image");

//insert a car into database route
router.post('/add', upload, (req, res) => {
  const car = new Car({
    car_name: req.body.car_name,
    rent_cost: req.body.rent_cost,
    size: req.body.size,
    car_image: req.file.filename,
  });
  car.save((err) =>{
    if(err){
      res.json({message: err.message, type: 'danger'});
    } else{
      req.session.message = {
        type: 'success',
        message: 'Car added successfully'
      };
      res.redirect('/');
    }
  })
});

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get("/", function (req, res, next) {
  res.render("cars/index");
});

router.get("/cars/create", function (req, res, next) {
  res.render("cars/createCar");
});

router.get("/cars/update", function (req, res, next) {
  res.render("cars/updateCar");
});

router.use("/cars", require('./cars'));
module.exports = router;