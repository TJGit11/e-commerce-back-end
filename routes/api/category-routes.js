const router = require("express").Router();
const sequelize = require("sequelize");
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
      attributes: {
        include: [
          [
            sequelize.literal(
              "(SELECT SUM(products) FROM product WHERE product.product_id = product.id)"
            ),
            "totalProducts",
          ],
        ],
      },
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
      attributes: {
        include: [
          [
            sequelize.literal(
              "(SELECT SUM(products) FROM product WHERE product.product_id = product.id)"
            ),
            "totalProduct",
          ],
        ],
      },
    });
    if (!driverData) {
      res.status(404).json({ message: "No product found with that id!" });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", (req, res) => {
  // create a new category
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
