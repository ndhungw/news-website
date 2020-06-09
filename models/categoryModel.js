const mongoose = require("mongoose"); // import mongoose
const slugify = require("slugify");
let Schema = mongoose.Schema; // use the mongoose schema object

// create Schema
let categorySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  categorySlug: {
    type: String,
    required: true,
    unique: true,
  },
});

categorySchema.pre("validate", function (next) {
  // create slug from title
  if (this.title) {
    this.categorySlug = slugify(this.title, {
      lower: true,
      strict: true,
    });
  }

  next();
});

let CategoryModel = mongoose.model("Category", categorySchema, "categories");

// Get all articles
CategoryModel.getAllCategories = () => {
  console.log("... RUN - CategoryModel.getAllCategories()");
  const query = CategoryModel.find();
  return query;
};

// add a new category
CategoryModel.addCategory = (categoryToAdd) => {
  console.log("... RUN - CategoryModel.addCategory()");
  return categoryToAdd.save();
};

// get a category by categorySlug
CategoryModel.getCategory = (categorySlug) => {
  console.log("... RUN - CategoryModel.getCategory()");
  const query = CategoryModel.findOne({ slug: categorySlug });
  return query;
};

// delete a category by id
CategoryModel.deleteCategory = (categoryId) => {
  console.log("... RUN - CategoryModel.deleteCategory()");
  return CategoryModel.findByIdAndDelete(categoryId);
};

// get a category by id
CategoryModel.getCategoryById = (categoryId) => {
  console.log("... RUN - CategoryModel.getCategoryById()");
  const query = CategoryModel.findById(categoryId);
  return query;
};

// CategoryModel.editArticle = (categoryToEdit) => {};

module.exports = CategoryModel;
