const Slide = require('../models/Slide');
const cloudinary = require('../utils/cloudinary');
const Property = require('../models/Property');

const getSlides = async (req,res) => {
  const slides = await Slide.find();
  return res.status(200).json(slides);
}


const getSlideById = async (req,res) => {
  const {id:slideID} = req.params;
  const slide = await Slide.find({_id:slideID});
  return res.status(200).json(slide);
}

const createSlide = async(req,res) => {
  try {
    // req.body.createdBy = req.user.userId; 
    const {propertyId, images, description} = req.body;
  
    if(!propertyId ||  !images || images.length == 0  || !description) {
      return res.status(401).send("Please fill the missing fields");
    }

    const property = await Property.findOne({_id:propertyId});

    if(!property) {
      return res.status(404).json({msg:`No property with id: ${propertyId}`});
    }


    const uploadedImages = await Promise.all(images.map(async img => {
      try {
        const result = await cloudinary.uploader.upload(img, {
          folder:"slide"
        });
        return {public_id:result.public_id,url:result.secure_url};
      } catch(error) {
        console.log(error);
      }
    }));  
    
    req.body.images = uploadedImages;

    const slide = await Slide.create({...req.body});
    property.slides.push(slide);
    await property.save();
    
    return res.status(201).json(slide);
  } catch (error) {
    console.log(error);
  }
}

const updateSlide = async (req,res) => {
  try {
    const {id:slideID} = req.params;
    const currentSlide = await Slide.findById({_id:slideID});

    if(!currentSlide) {
      return res.status(404).json({msg:`No slide with id : ${currentSlide}`});
    }

    if(req.body.image && req.body.image !== '') {
      const imgID = req.body.public_id;
      const imgIndex = currentSlide.images.findIndex(img => img.public_id == imgID);
      await cloudinary.uploader.destroy(imgID, (error, result) => {
        if (error) {
          console.error('Error deleting asset:', error);
        }
      });

      const upload = await cloudinary.uploader.upload(req.body.image, {
        folder:"slide"
      });
  
      const newImage = {
        public_id : upload.public_id,
        url: upload.secure_url
      }

  
      currentSlide.images.splice(imgIndex,1);
      currentSlide.images.splice(imgIndex, 0, newImage);

      req.body.images = currentSlide.images;

      delete req.body.public_id;
    }

    const slide = await Slide.findOneAndUpdate({_id:slideID},req.body,{
      new:true,
    });

    return res.status(200).json(slide);
  } catch(error) {
    console.log(error);
  }
}


const deleteSlide = async (req,res) => {
  const {id:slideID} = req.params;
  const { propertyId, type } = req.body;
  const property = await Property.findById({_id:propertyId});

  if(!property) {
    return res.status(404).json({msg:`No property with id: ${propertyId}`});
  }
  const slide = await Slide.findById({_id:slideID});

  if(!slide) {
    return res.status(404).json({msg:`No task with id: ${slideID}`});
  }

  const newArray = property[type].filter(id => id != slideID);
  property[type] = newArray;
  await property.save();

  slide.images.map(async img => {
    await cloudinary.uploader.destroy(img.public_id);
  });


  await Slide.findByIdAndDelete({_id:slideID});
  res.status(200).json(slide);  
}


module.exports = {
  getSlides,
  getSlideById,
  createSlide,
  updateSlide,
  deleteSlide,
}
