const Card = require('../models/Card');
const cloudinary = require('../utils/cloudinary');

const getAllCards = async (req,res) => {
  const cards = await Card.find();
  res.status(200).json(cards);
}
const getSingleCard = async (req,res) => {
  const {id:cardID} = req.params;
  const card = await Card.findOne({_id:cardID});
  if(!card) {
    return res.status(404).json({msg:`No property with id: ${cardID}`});
  }
  res.status(201).json(card);
}


const createCard = async(req,res) => {
  try {
    // req.body.createdBy = req.user.userId; 
    const {icon, title, description} = req.body;
  
    if(!icon || !title || !description) {
      return res.status(401).send("Please fill the missing fields");
    }

    const result = await cloudinary.uploader.upload(icon, {
      folder:"cards"
    });  

    const card = await Card.create({...req.body,icon:{public_id:result.public_id,url:result.secure_url}});

    return res.status(201).json(card);
  } catch (error) {
    console.log(error);
  }
}

const updateCard = async (req,res) => {
  try {
    const {id:cardID} = req.params;
    const card = await Card.findById({_id:cardID});
    if(req.body.icon && req.body.icon !== '') {
      const imgId = card.icon.public_id;
      await cloudinary.uploader.destroy(imgId);

      const newImage = await cloudinary.uploader.upload(req.body.icon, {
        folder:"cards"
      });

    req.body.icon = {
      public_id : newImage.public_id,
      url: newImage.secure_url
    }
  }
  const updatedCard = await Card.findOneAndUpdate({_id:cardID},req.body,{
    new:true,
  });

  if(!updatedCard) {
    return res.status(404).json({msg:`No task with id : ${cardID}`});
  }

  return res.status(200).json(updatedCard);
  } catch(error) {
    console.log(error);
  }
}


const deleteCard = async (req,res) => {
  try {
    const {id:cardID} = req.params;
    const card = await Card.findById({_id:cardID});

    if(!card) {
      return res.status(404).json({msg:`No task with id: ${cardID}`});
    }

    await Property.updateMany({}, {$pull: {cards: {$in: cardID}}});

    const imgId = card.icon.public_id;
    await cloudinary.uploader.destroy(imgId);

    await Card.findByIdAndDelete({_id:cardID});

    return res.status(200).json(card);  
  } catch (error) {
    console.log(error);
  }  
}

module.exports = {
  getAllCards,
  getSingleCard,
  createCard,
  updateCard,
  deleteCard,
}