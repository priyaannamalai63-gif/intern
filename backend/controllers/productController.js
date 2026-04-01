const Product = require("../models/Product");

const createProduct = async (req, res) => {
  try {
    // const usetrId = req.userId; // Extract userId from req object
    // if (!usetrId) {
    //   return res.status(401).json({
    //     message: "Unauthorized: User ID not found"
    //   });
    // }
    const { productName, productDetails , price, stock,category,status } = req.body;

    const product = new Product({
      productName,
      productDetails,
      price,
      stock,
      category,     // NEW
      status 
    });

    await product.save();

    res.status(201).json({
      message: "Product created successfully",
      success: true,
      // product: product
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      success: false
    });
  }
};
//get product code with pagination
const getProducts = async (req,res) => {
  try {

const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
const limit = 10; // Number of products per page
const skip = (page - 1) * limit; // Calculate the number of documents to skip

let filter = {};

if (req.query.category) {
 filter.category = { $regex: req.query.category, $options: "i" };   // $regex: searching text using pattern matching

}

 // ✅ SEARCH FILTER (NEW)
    if (req.query.search) {
      filter.productName = {
        $regex: req.query.search,
        $options: "i"
      };
    }


const totalRecords = await Product.countDocuments(filter);

const products = await Product.find(filter)
.select("-createdAt -updatedAt -__v")
.skip(skip)
.limit(limit);

    
  const totalPages = Math.ceil(totalRecords / limit); // Calculate total pages
  res.status(200).json({
       totalRecords,
      totalPages,
      currentPage: page,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
      nextPage: page < totalPages ? page + 1 : null,
      previousPage: page > 1 ? page - 1 : null,
      products
});
 } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};


//edit product code

const editProduct = async (req, res) => {
  try {

    const { productName, productDetails,price,stock , category,status} = req.body;

    //nagative price if condition
    if(price <= 0){
      return res.status(400).json({message:"Price cannot be negative"});
    }
    if(stock < 0){
      return res.status(400).json({message:"Invalid Stock"});
    }

    const product = await Product.findOneAndUpdate(
       {_id: req.params.id},
      {
        productName,
        productDetails,   //user want to change the details of the data it in json body
        price,
        stock,
        category,
        status
      }
      
    );


// console.log("found product:", product);



    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.status(200).json({
      message: "Product updated",
      // product
    });
  } catch (error) {
    console.log("Edit error:" , error)
    res.status(500).json({ message: "Server error" });
  }
};




//delete product code
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.id,

    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.status(200).json({
      message: "Product deleted"
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createProduct,getProducts, editProduct,deleteProduct };
