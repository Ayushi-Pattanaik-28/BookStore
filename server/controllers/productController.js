import Product from "./../models/productModel.js";


export const create = async (req, res) => {
  try {
    const productData = new Product(req.body);

    if (!productData) {
      return res.status(404).json({ msg: "Product data not found" });
    }

    const savedData = await productData.save();
    res.status(201).json({ msg: "Product created successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


export const getAll = async (req, res) => {
  try {
    const productData = await Product.find();
    if (!productData) {
      return res.status(404).json({ msg: "Products data not found." });
    }else{
      res.status(200).json(productData);
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


export const getOne = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ msg: "Product not found with this ID" });
    }else{
      res.status(200).json(product);
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(401).json({ msg: "Product not found" });
    }

    const updatedData = await Product.findByIdAndUpdate(id, req.body, { new: true });

    res.status(200).json({ msg: "Product updated successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ msg: "Product not found." });
    }
    await Product.findByIdAndDelete(id);
    res.status(200).json({ msg: "Product deleted successfully." });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
