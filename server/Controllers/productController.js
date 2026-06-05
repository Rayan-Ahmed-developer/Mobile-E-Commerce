const productModel = require("../Models/productModel")

const insertManyProducts = async (req, res) => {
    try {
        const productsArray = req.body;

        if (!Array.isArray(productsArray) || productsArray.length === 0) {
            return res.status(400).send({ status: 400, message: "Valid array of products bhejein" });
        }

        const savedProducts = await productModel.insertMany(productsArray);

        res.status(201).send({
            status: 201,
            message: `${savedProducts.length} products successfully add ho gaye`,
            data: savedProducts
        });
    } catch (error) {
        res.status(500).send({ status: 500, message: "Error in bulk insertion", error: error.message });
    }
};

// 1. ADD PRODUCT
const insertProduct = async (req, res) => {
  try {
    const newProduct = await productModel.create(req.body);
    res.send({ status: 200, message: "Data inserted", phone: newProduct });
  } catch (error) {
    res.send({ status: 500, message: "Error adding", error: error.message });
  }
};

// 2. VIEW PRODUCTS
const viewProduct = async (req, res) => {
  try {
    const productList = await productModel.find({ status: "active" });
    res.send({ status: 200, message: "product list", phones: productList });
  } catch (error) {
    res.send({ status: 500, message: "Error fetching", error: error.message });
  }
};

// 3. DELETE PRODUCT
const deleteProduct = async (req, res) => {
  try {
    await productModel.deleteOne({ _id: req.params.id });
    res.send({ status: 200, message: "product deleted" });
  } catch (error) {
    res.send({ status: 500, message: "Error deleting", error: error.message });
  }
};

// 4. UPDATE STATUS
const updateProductStatus = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    let newStatus = product.status === "active" ? "deactivate" : "active";
    await productModel.updateOne({ _id: req.params.id }, { status: newStatus });
    res.send({ status: 200, message: "product status updated", newStatus });
  } catch (error) {
    res.send({ status: 500, message: "Error toggling", error: error.message });
  }
};

// 5. UPDATE PRODUCT DETAILS
const updateProduct = async (req, res) => {
  try {
    await productModel.updateOne({ _id: req.params.id }, req.body);
    res.send({ status: 200, message: "product updated" });
  } catch (error) {
    res.send({ status: 500, message: "Error updating", error: error.message });
  }
};

// 6. CATEGORY FILTER (Search by Brand)
const categoryProduct = async (req, res) => {
  try {
    const name = req.params.category;
    const categoryList = await productModel.find({
      brand: { $regex: name, $options: "i" },
    });
    res.send({ status: 200, categoryItems: categoryList });
  } catch (error) {
    res.send({
      status: 500,
      message: "Error filtering category",
      error: error.message,
    });
  }
};

// 7. SEARCH PRODUCT (By Brand or Title)
const searchProduct = async (req, res) => {
  try {
    const name = req.params.name;
    const searchList = await productModel.find({
      $or: [
        { brand: { $regex: name, $options: "i" } },
        { title: { $regex: name, $options: "i" } },
      ],
    });
    res.send({ status: 200, message: "search result", phones: searchList });
  } catch (error) {
    res.send({ status: 500, message: "Error searching", error: error.message });
  }
};

// 8. SEARCH BY MODEL NAME
const getProductModel = async (req, res) => {
  try {
    const modelName = req.params.model;
    const modelList = await productModel.find({
      model: { $regex: modelName, $options: "i" },
    });
    res.send({ status: 200, message: "model list", phones: modelList });
  } catch (error) {
    res.send({
      status: 500,
      message: "Error fetching model list",
      error: error.message,
    });
  }
};

// 9. PRODUCT DETAILS
const productDetail = async (req, res) => {
  try {
    const item = await productModel.findById(req.params.id);
    res.send({ status: 200, message: "product details", product: item });
  } catch (error) {
    res.send({
      status: 500,
      message: "Error fetching details",
      error: error.message,
    });
  }
};

module.exports = {
  insertProduct,
  viewProduct,
  categoryProduct,
  searchProduct,
  getProductModel,
  productDetail,
  deleteProduct,
  updateProduct,
  updateProductStatus,
  insertManyProducts
};
