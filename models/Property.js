const mongoose = require('mongoose');


const PropertySchema = new mongoose.Schema({
  title: {
    type:String,
    required:[true,'Please provide title']
  },
  location:{
    type:String,
    required:[true,`Please provide location`],
  },
  reviews:[{
    type:mongoose.Types.ObjectId,
    ref:'Review',
    required:true,
    _id:false
  }],
  location_description:{
    type:String,
    required:[true,'Please provide l description'],
  },
  room_description:{
    type:String,
    required:[true,'Please provide r description'],
  },
  surrounding_description:{
    type:String,
    required:[true,'Please provide s description'],
  },
  cards:[{
    type:mongoose.Types.ObjectId,
    ref:'Card',
    required:true,
    _id:false
  }],
  price:{
    type:Number,
    required:[true,'Please  provide price'],
  },
  amenities:[{
    type:mongoose.Types.ObjectId,
    ref:'Amenity',
    required:true,
    _id:false
  }],
  slides:[{
    type:mongoose.Types.ObjectId,
    ref:'Slides',
    _id:false
  }],
  roomType:[{
    type: String,
    enum : ['full-property','dorm-beds','private-rooms'],
    required:true
  }],
  ats_image:[{
    type:mongoose.Types.ObjectId,
    ref:'Image',
    _id:false
  }],
  currentLocation_images:[{
    type:mongoose.Types.ObjectId,
    ref:'Image',
    _id:false
  }],
  video:{
    type:String,
    required:[true,'Please provide r description'],
  },
  events:[{
    type:mongoose.Types.ObjectId,
    ref:'Event',
    _id:false
  }],
  bhk:{
    type:Number,
    required:[true,'Please provide bhk'],
  }
  // createdBy:{
  //   type:mongoose.Types.ObjectId,
  //   ref:'User',
  //   required:[true,'Please provide user']
  // },
})



module.exports = mongoose.model('Property',PropertySchema);