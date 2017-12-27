const mongoose = require('mongoose');
var constants = require("../../../config/constants");
var requestHelper = require("../../../helpers/request");
var responseHelper = require("../../../helpers/response");

var gymMembers = {
    title: "Gym Member",
    statusCode: constants.HTTP.CODES.SUCCESS
}


//user scheme
var gymMemberskSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    mobilenumber: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    }

}, { collection: 'gyMember' });
var model = mongoose.model("gymMember", gymMemberskSchema);




/**** gym member get and post request**/
gymMembers.allGymMembers =
    function (req, res) {
        getgymMembers()
        res.send("gymMembers");
    }

    gymMembers.addGymMember = function (req, res) {
    console.log(req.body, "body")
    var gymMember = {
        name: req.body.name,
        branch: req.body.branch,
        manager: req.body.head
    }
    addGymMember(gymMember, function (err, data) {
        if (err) {
            console.log(err)
        }
        res.json(gymMember)
    })
    res.send("succesefully data has been save in Database");
}
//delet gym member
gymMembers.deleteGymMember =
    function (req, res) {
        var postBody = requestHelper.parseBody(req.body);
        res.send(postBody)
        var id = postBody._id.$oid;
        model.findByIdAndRemove(id, function (err, data) {
            if (err) {
                console.log(err)
            } else {
                console.log(data)
                console.log(constants.HTTP.CODES.SUCCESS)
            }
        })
    }


//add gym member
function addGymMember(data, callback) {
    var saveData = new model(data);

    saveData.save((err, value) => {
        if (err) {
            console.error(err, "err")
        }
        else {
            console.log(value, "data")
        }
    });
}


//get gym member
function getgymMembers(data, callback) {
    model.find(function (err, data) {
        if (err) {
            console.log(err)
        }
        console.log(data, "data blood")
    })
}
module.exports = gymMembers;