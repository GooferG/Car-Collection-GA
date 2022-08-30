const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notesSchema = new Schema({
    content: String,
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    userName: String,
    userAvatar: String
}, {
    timestamps: true
});

const carsSchema = new Schema({
    maker: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    releaseYear: {
        type: Number,
        default: function () {
            return new Date().getFullYear();
        }
    },
    purchaseDate: {type: Date, default: function(){
        return new Date()
        // return new Date(new Date().setFullYear(new Date().getFullYear()))
    }},
    cast: [{
        type: Schema.Types.ObjectId,
        ref: 'Parts'
    }],
    notes: [notesSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('car', carsSchema);