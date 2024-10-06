const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
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
  title:{
    type:String,
    required:[true,'Please provide title'],
  },
  description: {
    type:String,
    required:[true,'Please provide description'],
    max:200
  },
})


module.exports = mongoose.model('Card',CardSchema);