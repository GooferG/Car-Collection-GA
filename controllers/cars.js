const Car = require('../models/cars');
const Parts = require('../models/parts');

module.exports = {
  index,
  show,
  new: newCar,
  create,
  edit,
  update,
};

function index(req, res) {
  Car.find({}, function (err, cars) {
    res.render('cars/index', { model: '', cars });
  });
}

function show(req, res) {
  // Find the parts that belongs to the car
  Car.findById(req.params.id)
    .populate('parts')
    .exec(function (err, car) {
      Parts.find({ _id: { $nin: car.partList } }, function (err, parts) {
        res.render('cars/show', {
          model: 'Car Details', // this is H1 tag
          car, // this will have all the actors
          parts, // this will the actors that not in the car
        });
      });
    });
}

function newCar(req, res) {
  res.render('cars/new', { model: 'Add Car' });
}

function create(req, res) {
  console.log(req.body);
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  const car = new Car(req.body);
  console.log(car);
  car.save(function (err) {
    console.log(req.body);
    if (err) return res.redirect('/cars/new');

    res.redirect(`/cars/${car._id}`);
  });
}

// this function lets user edit schedule
function edit(req, res) {
  Car.findOne({ _id: req.params.id }, function (err, car) {
    if (err || !car) return res.redirect('/cars');
    res.render('cars/edit', { model: 'Edit Car', car });
  });
}
// this function lets user update the edited schedule
function update(req, res) {
  Car.findOneAndUpdate(
    { _id: req.params.id },
    // update object with updated properties
    req.body,
    // options object with new: true to make sure updated doc is returned
    { new: true },
    function (err, car) {
      if (err || !car) return res.redirect('/cars');
      res.redirect(`/cars/${car._id}`);
    }
  );
}
