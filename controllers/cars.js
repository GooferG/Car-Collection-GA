const Car = require('../models/cars');
const Parts = require('../models/parts');

module.exports = {
  index,
  show,
  new: newCar,
  create
};

function index(req, res) {
  Car.find({}, function(err, cars) {
    res.render('cars/index', { model: 'My Cars', cars });
  });
}

function show(req, res) {
  // Find the parts that belongs to the car
  Car.findById(req.params.id)
    .populate('parts').exec(function(err, car) {
      Parts.find(
        {_id: {$nin: car.partList}},
        function(err, parts) {
            res.render('cars/show',{
              model : 'Car Details', // this is H1 tag
              car, // this will have all the actors
              parts // this will the actors that not in the car
            });
        }
      );
    });
}

function newCar(req, res) {
  res.render('cars/new', { model: 'Add Car' });
}

function create(req, res) {
  // convert nowShowing's checkbox of nothing or "on" to boolean
  req.body.nowShowing = !!req.body.nowShowing;
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  const car = new Car(req.body);
  console.log(car)
  car.save(function(err) {
    if (err) return res.redirect('/cars/new');
    res.redirect(`/cars/${car._id}`);
  });
}

