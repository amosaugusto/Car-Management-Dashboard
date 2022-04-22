const express = require("express"); // import express
const multer = require("multer"); // for file upload

const PORT = process.env.PORT || 3000; // set port
const Controller = require("./controller/carsController"); // import controller
const app = express(); // create express app
const path = require("path"); // import path
const bodyParser = require("body-parser"); // import body parser
const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "./uploads")); // set destination
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname)); // set filename
    },
});

app.set("view engine", "ejs"); // set view engine to ejs
app.use(express.json()); // for parsing application/json
app.use(express.static("public")); // for static files
app.use(express.static("uploads")); // for static files
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
app.use(bodyParser.json()); // for parsing application/json

// Client Side
app.get("/", Controller.homepageView); // homepage
app.get("/create-car", Controller.inputView); // create car page
app.get("/edit-car/:id", Controller.editView); // edit car page
app.get("/:id", Controller.filterResult); // filter result
app.post("/search", Controller.searchResult); // search result
// END Client Side

/* Server Side (API) */
app.post("/api/v1/Cars", multer({storage: diskStorage}).single("image_car"), Controller.createCar);
app.get("/api/v1/Cars", Controller.getCars);
app.get("/api/v1/FilterCars/:id", Controller.filterAPI);
app.get("/api/v1/SearchCars/:search", Controller.searchAPI);
app.get("/api/v1/Cars/:id", Controller.getCar);
app.post("/api/v1/Cars/:id", multer({storage: diskStorage}).single("image_car"), Controller.updateCar);
app.get("/api/v1/deleteCars/:id", Controller.deleteCar);
app.post("/api/v1/Type_Cars", Controller.createTypeCar);
// END API

app.listen(PORT, () => console.log(`Server Running on PORT ${PORT}`));
