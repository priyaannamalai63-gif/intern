const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true
  },
  productDetails: {
    type: String,
    required: true
  },
  price:{
    type : Number,
    required: true
  },
   category: {                    
    type: String,
    required: true
  },

  status: {                       
    type: String,
    enum: ["active", "inactive"], // allowed values
    default: "active"
  },
  stock:{
    type:Number,
    required:true
  },
  userId:{
    type : mongoose.Schema.Types.ObjectId,
    ref : "User",
    required : false
  }
},
{
  timestamps : true
});

module.exports = mongoose.model("Product", productSchema);
