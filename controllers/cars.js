const Car = require('../models/cars');

module.exports = {
  index,
  show,
  new: newCar,
  create,
  edit,
  update,
  // deleteCar,
};

function index(req, res) {
  Car.find({}, function (err, cars) {
    res.render('cars/index', { model: '', cars });
  });
}

// function index(req, res) {
//   Car.find({}, function(err, cars) {
//     res.render('cars/index', { model: 'My Cars', cars });
//   });
// }

function show(req, res) {
  // Find the parts that belongs to the car
  Car.findById(req.params.id, function (err, car) {
    res.render('cars/show', {
      model: '', // this is H1 tag
      car, // this will have all the actors
    });
  });
}

function newCar(req, res) {
  res.render('cars/new', { model: '' });
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

// function deleteCar(req, res, next) {
//   // Note the cool "dot" syntax to query on the property of a subdoc
//   Car.findOne({ _id: req.params.id }).then(function (car) {
//     // Remove the note using the remove method of the subdoc
//     car.remove();
//     // Save the updated car
//     car
//       .save()
//       .then(function () {
//         // Redirect back to the car's show view
//         res.redirect(`/cars`);
//       })
//       .catch(function (err) {
//         // Let Express display an error
//         return next(err);
//         // res.redirect(`/cars/${car._id}`);
//       });
//   });
// }
