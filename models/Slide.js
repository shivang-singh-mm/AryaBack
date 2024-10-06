const mongoose = require('mongoose');

const SlideSchema = new mongoose.Schema({
  images:[{
    public_id:{
      type:String,
      required:true
    },
    url:{
      type:String,
      required:true
    },
    _id:false
  }],
  description:{
    type:String,
    required:[true,'Please provide description'],
  }
});



module.exports = mongoose.model('Slide',SlideSchema);