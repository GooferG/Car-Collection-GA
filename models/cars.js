const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteschema = new Schema({
    content: String,
    rating: {type: Number, min: 1, max: 5, default: 5},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    userName: String,
    userAvatar: String
}, {
    timestamps: true
});

const carschema = new Schema({
    title: {
        type: String,
        required: true
    },
    releaseYear: {
        type: Number,
        default: function () {
            return new Date().getFullYear();
        }
    },
    mpaaRating: String,
    cast: [{
        type: Schema.Types.ObjectId,
        ref: 'Parts'
    }],
    nowShowing: {type: Boolean, default: false},
    notes: [noteschema]
}, {
    timestamps: true
});

module.exports = mongoose.model('car', carschema);