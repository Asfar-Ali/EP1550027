//import { mongo } from 'mongoose';
//import { text } from './C:/Users/Asfar Ahmed/AppData/Local/Microsoft/TypeScript/2.6/node_modules/@types/body-parser';

const mongoose = require('mongoose');
var constants = require("../../../config/constants");
var requestHelper = require("../../../helpers/request");
var responseHelper = require("../../../helpers/response");

var check = {
    title: "GymMember",
    statusCode: constants.HTTP.CODES.SUCCESS
}
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://FitnessClub:asfar123@ds257495.mlab.com:57495/fitness_club', { useMongoClient: true })


//user schema
var headSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    }
}, { Collection: "user" });

var model = mongoose.model("user", headSchema);

check.addData = function (req, res) {
    var postBody = requestHelper.parseBody(req.body);

    var data = {
        name: postBody.name,
        email: postBody.email,
        password:postBody.password,
        number: postBody.number,
        age: postBody.age,
        Address: postBody.Address,
        branch: postbody.branch
    }

    // add user function
    var saveData = new model(data);
    saveData.save((err, dat) => {
        if(err){
            console.error(err, "err")
        }
        else {
            res.send("data has been sent");
            console.log(dat, "data")

        }
    });
}
check.signin  = function (req, res) {
    var postBody = requestHelper.parseBody(req.body);
    // authentication function
    var check=false;
    var user=null;
    model.find(function(err,data){
        if(err){
            console.log('Error occur');
        }
        else{
            for(let i=0;i<data.length;i++){
                if(data[i].email===postBody.email && data[i].password===postBody.password){
                    check=true;
                    user=data[i];
                    break;
                }
            }
        }

    })
    if (check) {
        responseBody = responseHelper.formatResponse(
          constants.MESSAGES.LOGIN.SUCCESS,
          loginUser
        )
        res.statusCode = constants.HTTP.CODES.SUCCESS;
        res.send(responseBody);

      } else {
        responseBody = responseHelper.formatResponse(
          constants.MESSAGES.LOGIN.AUTH_FAILED,
          {}
        )

        res.statusCode = constants.HTTP.CODES.BAD_REQUEST;
        res.send(responseBody);
      }
}
module.exports = check;
 