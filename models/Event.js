const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: {
    type:Number,
    required:[true,'Please provide number'],
  },
  start: {
    type:Date,
    required:true,
  },
  end: {
    type:Date,
    required:true,
  },
  type:{
    type: String,
    enum : ['full-property','dorm-beds','private-rooms'],
    required:true
  }
})


module.exports = mongoose.model('Event', EventSchema);