const test = require("node:test");
const assert = require("node:assert/strict");
const Product = require("../models/productModel");
const controller = require("../controllers/productController");

test("shop filters legacy products by name and sorts the result", async () => {
  const originalFind = Product.find;
  Product.find = () => ({ lean: async () => [
    { _id: "1", name: "Camo Cargo Pants", price: 850000 },
    { _id: "2", name: "Black Cargo Pants", price: 650000 },
    { _id: "3", name: "Boxy Hoodie", price: 790000 },
  ] });
  try {
    const req = { query: { category: "pants", sort: "price-asc" } };
    const res = { render(view, locals) {
      assert.equal(view, "products");
      assert.deepEqual(locals.products.map((p) => p.name), ["Black Cargo Pants", "Camo Cargo Pants"]);
    } };
    await controller.getAllProducts(req, res);
  } finally {
    Product.find = originalFind;
  }
});