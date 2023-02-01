const { Schema, model} = require('mongoose');

const schema = new Schema ({
    title: { type: String, required: true, minLength: 10},
    charity: { type: String, required: true, minLength: 2}, 
    imageUrl: { type: String, required: true, match: [/^https?/, 'Image must be a valid URL']},
    description: { type: String, required: true, minLength: 10, maxLength: 100},
    category: { type: String, required: true, minLength: 5},
    price: { type: Number, required: true, min:1},
    buyinglist: [{ type: Schema.Types.ObjectId, ref: 'User'}],
    owner: { type: Schema.Types.ObjectId, ref: 'User'},
});

module.exports = model('Toy', schema);

//BuyingList - a collection of Users (a reference to the User model)
//Owner - object Id (a reference to the User model)
// Note:  When a user buys toys, their id is added to that collection (Buy toys)
// Implement the entities with the correct data types.
