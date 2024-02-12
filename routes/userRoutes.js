const express=require("express");

const router =express.Router();
const {registerUser,loginUser,currentInfoUser}=require("../controllers/userController")

router.post("/register",registerUser)

router.post("/login",loginUser)

router.get("/current",currentInfoUser)

module.exports=router