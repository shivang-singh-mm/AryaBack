const Image = require('../models/Image');
const Property = require('../models/Property');
const cloudinary = require('../utils/cloudinary');

const getAllImages = async (req,res) => {
  const images = await Image.find();
  return res.status(200).json(images);
}

const getSingleImage = async (req,res) => {
  const {id:imageID} = req.params;
  const image = await Image.findOne({_id:imageID});

  if(!image) {
    return res.status(404).json({msg:`No Image with id: ${imageID}`});
  }

  return res.status(201).json(image);
}


const createImage = async (req,res) => {
  try {
  // req.body.createdBy = req.user.userId; 
  const {propertyId, type, image} = req.body;

  if(!propertyId || !image || !type) {
    return res.status(401).send("Please fill the missing fields");
  }

  const property = await Property.findOne({_id:propertyId});

  if(!property) {
    return res.status(404).json({msg:`No property with id: ${propertyId}`});
  }

  const result = await cloudinary.uploader.upload(image, {
    folder:"images"
  });

  const uploadedImage = {
    public_id:result.public_id,
    url:result.secure_url
  }

  const createdImage = await Image.create({...uploadedImage});
  property[type].push(createdImage);
  await property.save();


  return res.status(201).json(createdImage);
  } catch (error) {
    console.log(error);
  }
  
}


const updateImage = async (req,res) => {
  try {
    const {id:imageID} = req.params;
    const image = await Image.findById({_id:imageID});
  
    if(!image) {
      return res.status(404).json({msg:`No image with id: ${imageID}`});
    }

    const imgId = image.public_id;
    await cloudinary.uploader.destroy(imgId);

    const newImage = await cloudinary.uploader.upload(req.body.image, {
      folder:"images"
    });

    const uploadedImage = {
      public_id : newImage.public_id,
      url: newImage.secure_url
    }
    

    const updatedImage = await Image.findOneAndUpdate({_id:imageID},uploadedImage,{
      new:true,
    });

    if(!updatedImage) {
      return res.status(404).json({msg:`No task with id : ${imageID}`});
    }


    return res.status(200).json(updatedImage);
  } catch(error) {
    console.log(error);
  }
}

const deleteImage = async (req,res) => {
  const {id:imageID} = req.params;
  const { propertyId, type } = req.body;
  const property = await Property.findById({_id:propertyId});

  if(!property) {
    return res.status(404).json({msg:`No property with id: ${propertyId}`});
  }

  const image = await Image.findById({_id:imageID});
  if(!image) {
    return res.status(404).json({msg:`No image with id: ${imageID}`});
  }

  const newArray = property[type].filter(id => id != imageID);
  property[type] = newArray;
  await property.save();


  const imgId = image.public_id;
  await cloudinary.uploader.destroy(imgId);

  await Image.findByIdAndDelete({_id:imageID});
  return res.status(200).json(image);  
}

module.exports = {
  getAllImages,
  getSingleImage,
  updateImage,
  deleteImage,
  createImage
}

