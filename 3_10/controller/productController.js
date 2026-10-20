const Product = require("../models/productModel");

const categories = ["hoodies", "tees", "outerwear", "pants"];

function categoryOf(product) {
  if (categories.includes(product.category)) return product.category;

  const name = product.name.toLowerCase();
  if (name.includes("hoodie")) return "hoodies";
  if (name.includes("tee")) return "tees";
  if (name.includes("jacket")) return "outerwear";
  if (name.includes("pants") || name.includes("cargo")) return "pants";
  return "hoodies";
}

exports.getHome = async (req, res) => {
  const products = await Product.find().lean();
  res.render("homePage", { featured: products.slice(0, 4) });
};

exports.getAllProducts = async (req, res) => {
  const category = categories.includes(req.query.category)
    ? req.query.category
    : "all";
  const search = String(req.query.q || "").trim();
  const sort = ["price-asc", "price-desc"].includes(req.query.sort)
    ? req.query.sort
    : "newest";

  let products = await Product.find().lean();

  if (category !== "all") {
    products = products.filter((product) => categoryOf(product) === category);
  }

  if (search) {
    products = products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase()),
    );
  }

  if (sort === "price-asc") {
    products.sort((a, b) => a.price - b.price);
  } else if (sort === "price-desc") {
    products.sort((a, b) => b.price - a.price);
  } else {
    products.sort((a, b) => String(b._id).localeCompare(String(a._id)));
  }

  res.render("products", { products, categories, category, search, sort });
};

exports.showAddProductForm = (req, res) => {
  res.render("addPage", { categories, categoryOf });
};

exports.addProduct = async (req, res) => {
  const mainImage = req.files?.image?.[0];

  if (!mainImage) {
    return res.status(400).send("Please choose PNG, JPG, or WEBP.");
  }

  const {
    name,
    price,
    quantity,
    category,
    description,
    color,
    material,
    fit,
    care,
  } = req.body;
  const newProduct = new Product({
    name,
    price,
    quantity,
    category,
    description,
    color,
    material,
    fit,
    care,
    sizes: [].concat(req.body.sizes || []),
    image: `/uploads/${mainImage.filename}`,
    images: (req.files?.images || []).map(
      (file) => `/uploads/${file.filename}`,
    ),
  });

  await newProduct.save();
  res.redirect(`/products/${newProduct._id}`);
};

exports.showEditProductForm = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).send("Not found product.");

  res.render("editPage", { product, categories, categoryOf });
};

exports.updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).send("Not found product.");

  const {
    name,
    price,
    quantity,
    category,
    description,
    color,
    material,
    fit,
    care,
  } = req.body;
  Object.assign(product, {
    name,
    price,
    quantity,
    category,
    description,
    color,
    material,
    fit,
    care,
    sizes: [].concat(req.body.sizes || []),
  });

  const mainImage = req.files?.image?.[0];
  if (mainImage) product.image = `/uploads/${mainImage.filename}`;

  const newImages = (req.files?.images || []).map(
    (file) => `/uploads/${file.filename}`,
  );
  product.images = [...(product.images || []), ...newImages];

  await product.save();
  res.redirect(`/products/${product._id}`);
};

exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect("/shop");
};

exports.showProductDetail = async (req, res) => {
  const product = await Product.findById(req.params.id).lean();
  if (!product) return res.status(404).send("Not found product");

  const products = await Product.find().lean();
  const related = products
    .filter((item) => String(item._id) !== String(product._id))
    .slice(0, 4);

  res.render("detailPage", { product, related, categoryOf });
};

exports.searchProduct = async (req, res) => {
  const query = req.query.q;
  const products = await Product.find({
    name: { $regex: query, $options: "i" },
  });
  res.render("homePage", { products });
};