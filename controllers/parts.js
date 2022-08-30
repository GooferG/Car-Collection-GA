const Parts = require('../models/parts');
const Car = require('../models/cars');


function create(req, res) {
  // Need to "fix" date formatting to prevent day off by 1
  // This is due to the <input type="date"> returning the date
  // string in this format:  "YYYY-MM-DD"
  // https://stackoverflow.com/questions/7556591/is-the-javascript-date-object-always-one-day-off
  const s = req.body.born;
  req.body.born = `${s.substr(5, 2)}-${s.substr(8, 2)}-${s.substr(0, 4)}`;
  Parts.create(req.body, function (err, part) {
    res.redirect('/parts/new');
  });
}

function newParts(req, res) {
  Parts.find({}, function (err, parts) {
    res.render('parts/new', {
      model: 'Add Parts', // this is the H1 tag, or the page title 
      parts
    });
  })
}

function addtoParts(req, res){
  Car.findById(req.params.id, function(error, car){
    car.cast.push(req.body.partId);
    car.save(function(error){
      res.redirect(`/cars/${car._id}`);
    });
  });
}


module.exports = {
  new: newParts,
  create,
  addtoParts
};