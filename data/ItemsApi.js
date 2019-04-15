var mongoose = require('../models/Mongoose');
var Items = require('../models/Item');
var fs = require('fs');
var imgPath = '/Users/Siva Cheerla/Downloads/img1.jpg';

// establishing connection
mongoose.on('error', function (err) {
    console.log('Connection error', err);
});
mongoose.once('open', function () {
    console.log('Connected to DB.');
});

module.exports = {

    // Get all items based on foodcourt id, ex: foodcourt 1100
    getAllItems: function (req, res, next) {
        Items.find({ foodcourt_id: 1100 }, function (err, response) {
            if (err) {
                console.log(err);
            } else {
                console.log("Getting all items...");
                // getting image
                // res.contentType(response[0].img.contentType);
                // res.send(response[0].img.data);

                // res.send(response[0].id + " " + response[0].name + " " + response[0].gst + " " +
                //     response[0].validity + " " + response[0].contact.email + " " +
                //     response[0].contact.mobile + " " + response[0].password + " " +
                //     response[0].address.locality + " " + response[0].address.city);
                res.json(response);
            }
        })
    },

    // Get single item by ID
    getItem: function (req, res, next) {
        Items.find({ id: 11001 }, function (err, response) {
            if (err) {
                console.log(err);
            } else {
                console.log("Getting item by ID...");
                // getting image
                // res.contentType(response[0].img.contentType);
                // res.send(response[0].img.data);

                // res.send(response[0].id + " " + response[0].name + " " + response[0].gst + " " +
                //     response[0].validity + " " + response[0].contact.email + " " +
                //     response[0].contact.mobile + " " + response[0].password + " " +
                //     response[0].address.locality + " " + response[0].address.city);
                res.json(response);
            }
        })
    },

    // Adding new item to the current foodcourt, ex: foodcourt 1100
    addNewItem: function (req, res, next) {
        Items.find({ foodcourt_id: 1100 }).sort({
            id: -1
        }).limit(1).exec(function (err, response) {
            if (err) {
                console.log(err);
            } else {
                var maxId;
                console.log("Finding max id...");
                if (response.length == 0) {
                    maxId = Number(11001);
                } else {
                    maxId = Number(response[0].id) + 1;
                }

                var newItem = new Items({
                    id: maxId,
                    foodcourt_id: 1100,
                    name: 'Butter Chicken',
                    price: '$150',
                    availability: 'Available!',
                    img: {
                        data: fs.readFileSync(imgPath),
                        contentType: 'image/jpg'
                    }
                });

                newItem.save(function (err, response) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('Adding new item...');
                        res.json(response.id);
                    }
                });
            }
        });
    },

    // Updating item by ID
    updateItem: function (req, res, next) {
        Items.findOneAndUpdate({
            id: 11001
        }, {
                $set: {
                    name: 'Chicken Sandwich',
                    price: '$150',
                    availability: 'Available!',
                    img: {
                        data: fs.readFileSync(imgPath),
                        contentType: 'image/jpg'
                    }
                }
            }, function (err, response) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log('Updating item by ID...');
                    res.json(response.id);
                }
            });
    },

    // Deleting an existing item
    deleteItem: function (req, res, next) {
        Items.findOneAndDelete({
            id: 11001
        }, function (err, response) {
            if (err)
                return console.log(err);
            else {
                console.log('Deleting item by ID...');
                res.json(response.id);
            }
        });
    }
}
