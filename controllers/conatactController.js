const asyncHandler=require("express-async-handler");
const Contacts =require('../models/contactModel')

//@desc get all contacts
//@route GET /ap/conatcts
//@acess public


const getContact=asyncHandler(async (req,res)=>{
    const contact=await Contacts.find();
    res.status(200).json(contact);
})

//@desc create a new contacts
//@route Post /ap/conatcts
//@acess public

const createContact=asyncHandler(async (req,res)=>{
    console.log("This is the req body:",req.body);
    const{name,email,phone}=req.body;
    if(!name ||!email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory")
    }
    const contact=await Contacts.create({
        name,
        email,
        phone,
    })

    res.status(201).json(contact);
})


//@desc Get a  contacts with id
//@route GET /ap/conatcts
//@acess public


const getaContact=asyncHandler(async (req,res)=>{
    const contact =await Contacts.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact Not Found");
    }
    res.status(200).json(contact)
})

//@desc Update a  contacts
//@route Put /ap/conatcts
//@acess public


const updateContact=asyncHandler(async (req,res)=>{
    const contact =await Contacts.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact Not Found");
    }

    const updatedContact=await Contacts.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new:true
        }
    )
    res.status(200).json(updateContact)
})
//@desc Delete a  contacts
//@route delete /ap/conatcts
//@acess public


const deleteContact=asyncHandler(async (req,res)=>{
    const contact =await Contacts.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact Not Found");
    }
    await Contacts.findByIdAndDelete(req.params.id);
    res.status(200).json(contact)
})

module.exports ={getContact,createContact,getaContact,updateContact,deleteContact};