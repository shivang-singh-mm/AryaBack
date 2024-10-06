const Amenity = require('../models/Amenity');
const Property = require('../models/Property');
const cloudinary = require('../utils/cloudinary');

const getAllAmenities = async (req,res) => {
  const amenities = await Amenity.find();
  res.status(200).json(amenities);
}
const getSingleAmenity = async (req,res) => {
  const {id:amenityID} = req.params;
  const amenity = await Amenity.findOne({_id:amenityID});
  if(!amenity) {
    return res.status(404).json({msg:`No property with id: ${amenityID}`});
  }
  res.status(201).json(amenity);
}


const createAmenity = async(req,res) => {
  try {
    // req.body.createdBy = req.user.userId; 
    const {icon, title, description, price, type} = req.body;
  
    if(!icon || !title || !description || !price || !type) {
      return res.status(401).send("Please fill the missing fields");
    }

    const result = await cloudinary.uploader.upload(icon, {
      folder:"amenities"
    });  

    const amenity = await Amenity.create({...req.body,icon:{public_id:result.public_id,url:result.secure_url}});

    return res.status(201).json(amenity);
  } catch (error) {
    console.log(error);
  }
}

const updateAmenity = async (req,res) => {
  try {
    const {id:amenityID} = req.params;
    const amenity = await Amenity.findById({_id:amenityID});
    if(req.body.icon && req.body.icon !== '') {
      const imgId = amenity.icon.public_id;
      await cloudinary.uploader.destroy(imgId);

      const newImage = await cloudinary.uploader.upload(req.body.icon, {
        folder:"amenities"
      });

      req.body.icon = {
        public_id : newImage.public_id,
        url: newImage.secure_url
      }
    }
    const updatedAmenity = await Amenity.findOneAndUpdate({_id:amenityID},req.body,{
      new:true,
    });

    if(!updatedAmenity) {
      return res.status(404).json({msg:`No task with id : ${amenityID}`});
    }

    return res.status(200).json(updatedAmenity);
  } catch(error) {
    console.log(error);
  }
}


const deleteAmenity = async (req,res) => {
  try {
    const {id:amenityID} = req.params;
    const amenity = await Amenity.findById({_id:amenityID});

    if(!amenity) {
      return res.status(404).json({msg:`No task with id: ${amenityID}`});
    }

    await Property.updateMany({}, {$pull: {amenities: {$in: amenityID}}});

    const imgId = amenity.icon.public_id;
    await cloudinary.uploader.destroy(imgId);

    await Amenity.findByIdAndDelete({_id:amenityID});

    return res.status(200).json(amenity);  
  } catch (error) {
    console.log(error);
  }  
}

module.exports = {
  getAllAmenities,
  getSingleAmenity,
  createAmenity,
  updateAmenity,
  deleteAmenity,
}