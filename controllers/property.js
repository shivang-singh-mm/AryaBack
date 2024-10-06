const Property = require('../models/Property');
const cloudinary = require('../utils/cloudinary');
const {
  deleteSlide,
} = require('../controllers/slide');

const getAllPropertys = async (req,res) => {
  const propertys = await Property.find();
  return res.status(200).json(propertys);
}

const getSingleProperty = async (req,res) => {
  const {id:propertyID} = req.params;
  const property = await Property.findOne({_id:propertyID});

  if(!property) {
    return res.status(404).json({msg:`No property with id: ${propertyID}`});
  }

  return res.status(201).json(property);
}


const createProperty = async (req,res) => {
  try {
  // req.body.createdBy = req.user.userId; 
  const {title,location,reviews, location_description,room_description,surrounding_description,cards,price,amenities,slides,roomType,currentLocation_images,ats_image,bhk} = req.body;

  if(!title || !location || !reviews || !price  || !location_description || !room_description || !surrounding_description || !cards || !amenities || !roomType || !currentLocation_images || !ats_image || !slides || !bhk) {
    return res.status(401).send("Please fill the missing fields");
  }


  const property = await Property.create({...req.body});
  return res.status(201).json(property);
  } catch (error) {
    console.log(error);
  }
  
}


const updateProperty = async (req,res) => {
  try {
    const {id:propertyID} = req.params;
    const currentProperty = await Property.findById({_id:propertyID});
  if(req.body.image && req.body.image !== '') {
    const type = req.body.type;
    const public_id = req.body.public_id;
    const imgs = currentProperty[type];
    const img = imgs.find(img => img.public_id == public_id);
    const imgIndex = imgs.findIndex(img => img.public_id == public_id);
    await cloudinary.uploader.destroy(img.public_id);

    const upload = await cloudinary.uploader.upload(req.body.image, {
      folder:"propertys"
    });

    const newImage = {
      public_id : upload.public_id,
      url: upload.secure_url
    }

    currentProperty[type].splice(imgIndex,1);
    currentProperty[type].splice(imgIndex, 0, newImage);

    req.body[type] = currentProperty[type];
    delete req.body.type;
  }
  const property = await Property.findOneAndUpdate({_id:propertyID},req.body,{
    new:true,
    // runValidators:true,
  });

  if(!property) {
    return res.status(404).json({msg:`No task with id : ${propertyID}`});
  }

  return res.status(200).json(property);
  } catch(error) {
    console.log(error);
  }
}

const deleteProperty = async (req,res) => {
  const {id:propertyID} = req.params;
  const property = await Property.findById({_id:propertyID});
  if(!property) {
    return res.status(404).json({msg:`No task with id: ${propertyID}`});
  }

  await Property.findByIdAndDelete({_id:propertyID});
  return res.status(200).json(property);  
}

module.exports = {
  getAllPropertys,
  getSingleProperty,
  updateProperty,
  deleteProperty,
  createProperty
}

