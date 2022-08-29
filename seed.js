// seed.js
// require('dotenv').config();
// require('./config/database');
// const Movie = require('./models/movie');
// const Performer = require('./models/performer');

// For better organization, the see data is being stored in a separate data.js module
// const data = require('./data');

// const p1 = Movie.deleteMany({}); // Promise ==> resolve
// const p2 = Performer.deleteMany({}); // Promise ==> resolve
// const p3 = Performer.create(data.performers); // Promise ==> resolve

// p1.then(function (res) {
//     console.log(res);
// })


// Promise.all([p1, p2])
//     .then(function (result) {
//         console.log(result);
//         return Performer.create(data.performers); // Promise
//     }).then(function (p) {
//     console.log(p);
// }).then(function () {
//     console.log("create movies here!");
//     return Movie.create(data.movies);
// }).then(function (result) {
//     console.log(result);
//     process.exit();
// });
let car = new Promise(function (resolve, reject) {
        let fuelFullTank = true;
        if(fuelFullTank){
            resolve();
        } else{
            reject();
        }
});

car.then(function (result){
    console.log('Tank is full! ');
    console.log(result);
}).catch(function (error){
    console.log('Tank is empty');
    console.log(error);
}).finally(function (){
   console.log('runs no matter what!!!');
});

















