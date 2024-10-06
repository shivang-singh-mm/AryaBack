const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  userId:{
    type:String,
    ref:'User',
    required:true
  },
  propertyId:{
    type:mongoose.Types.ObjectId,
    ref:'Property',
    required:true
  },
  rating:{
    type:Number,
    required:[true,'Please provide rating'],
    max:5,
    min:1
  },
  description: {
    type:String,
    required:[true,'Please provide review description'],
    max:300
  }
})


module.exports = mongoose.model('Review',ReviewSchema);