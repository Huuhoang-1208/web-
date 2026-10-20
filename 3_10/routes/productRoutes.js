const express = require("express");
const router = express.Router();
const multer = require("multer");
const productController = require("../controllers/productController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extensions = {
      "image/jpeg": ".jpg",
      "image/png": ".png",
      "image/webp": ".webp",
    };
    cb(null, uniqueSuffix + extensions[file.mimetype]);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) =>
    cb(null, ["image/jpeg", "image/png", "image/webp"].includes(file.mimetype)),
});

router.get("/", productController.getHome);
router.get("/shop", productController.getAllProducts);
router.get("/add", productController.showAddProductForm);
router.post(
  "/add",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "images", maxCount: 8 },
  ]),
  productController.addProduct,
);
router.get("/edit/:id", productController.showEditProductForm);
router.post(
  "/edit/:id",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "images", maxCount: 8 },
  ]),
  productController.updateProduct,
);
router.post("/delete/:id", productController.deleteProduct);
router.get("/products/:id", productController.showProductDetail);
router.get("/search", (req, res) =>
  res.redirect(`/shop?q=${encodeURIComponent(req.query.q || "")}`),
);

module.exports = router;