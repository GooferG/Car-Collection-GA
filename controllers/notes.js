const Car = require('../models/cars');


function create(req, res) {
    // Find the car to embed the note within
    Car.findById(req.params.id, function (err, car) {

        // Add the user-centric info to req.body (the new note)
        req.body.user = req.user._id;
        req.body.userName = req.user.name;
        req.body.userAvatar = req.user.avatar;

        // Push the subdoc for the note
        car.notes.push(req.body);
        // Always save the top-level document (not subdocs)
        car.save(function (err) {
            res.redirect(`/cars/${car._id}`);
        });
    });
}

// controllers/notes.js

// Include the next parameter - used for error handling in the catch
function deleteNotes(req, res, next) {
    // Note the cool "dot" syntax to query on the property of a subdoc
    Car.findOne({'notes._id': req.params.id}).then(function(car) {
      // Find the note subdoc using the id method on Mongoose arrays
      // https://mongoosejs.com/docs/subdocs.html
      const note = car.notes.id(req.params.id);
      // Ensure that the note was created by the logged in user
      if (!note.user.equals(req.user._id)) return res.redirect(`/cars/${car._id}`);
      // Remove the note using the remove method of the subdoc
      note.remove();
      // Save the updated car
      car.save().then(function() {
        // Redirect back to the car's show view
        res.redirect(`/cars/${car._id}`);
      }).catch(function(err) {
        // Let Express display an error
        return next(err);
        // res.redirect(`/cars/${car._id}`);
      });
    });
  }
  


module.exports = {
    create,
    delete: deleteNotes
};