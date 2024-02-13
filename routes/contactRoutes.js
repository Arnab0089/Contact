const express=require('express');
const router=express.Router();

const {getContact,createContact,getaContact,updateContact,deleteContact}=require('../controllers/conatactController');
const validateToken = require('../middleware/validateTokenHandler');


router.use(validateToken);
router.route("/").get(getContact).post(createContact)
router.route("/:id").get(getaContact).put(updateContact).delete(deleteContact)



module.exports=router;