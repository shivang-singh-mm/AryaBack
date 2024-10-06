const mongoose = require('mongoose');

const AmenitySchema = new mongoose.Schema({
  icon:{
    public_id:{
      type:String,
      required:true
    },
    url:{
      type:String,
      required:true
    },
    _id:false,
  },
  type:{
    type:String,
    required:[true,'Please provide type'],
  },
  title:{
    type:String,
    required:[true,'Please provide title'],
  },
  description: {
    type:String,
    required:[true,'Please provide description'],
    max:200
  },
  price:{
    type:Number,
    required:[true,'Please provide price']
  }
})





module.exports = mongoose.model('Amenity',AmenitySchema);