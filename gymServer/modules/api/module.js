var express = require('express');
var router = express.Router();
//var auth = require("./main/auth")
var gymMembers = require('./gymMembers/gymMembers')
var check = require('./check/check')


//router.get('/', auth.home);
/**gym members request handlers**/
/**router.get('/gymMembers', gymMembers.allGymMembers);
router.post('/addGymMember', gymMembers.addGymMember);
router.delete('/deleteGymMember/:_bId', gymMembers.deleteGymMember);
signup login request handlers**/
router.post('/signup', check.addData);
router.post('/login', check.signin);
router.get('/memberAll', gymMembers.allGymMembers);
router.post('/memberAdd', gymMembers.addGymMember);
router.post('/memberDelete', gymMembers.deleteGymMember);

module.exports = router;
