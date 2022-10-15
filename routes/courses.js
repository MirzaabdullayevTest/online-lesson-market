const express = require("express");
const router = express.Router();
const Course = require("../model/course");
const Category = require("../model/category");
const {Types} = require('mongoose')

router.get("/", async function (req, res, next) {
  const courses = await Course.find();
  res.render("courses", {
    title: "Courses",
    courses,
  });
});

router.get('/update/:id', async (req, res) => {
  const course = await Course.findById(req.params.id)
  const categories = await Category.find();
  res.render('updateCourse', {
    title: course.name,
    image: course.image,
    id: course.id,
    categories
  })
})

router.post('/update/', async (req, res) => {
  const { name, image, id, categoryId, price } = req.body
  await Course.findByIdAndUpdate(id, {
     name, 
     image, 
     categoryId: Types.ObjectId(categoryId),
     price 
    })
  res.redirect('/courses')
})

router.get('/remove/:id', async (req, res) => {
  const id = req.params.id
  await Course.findByIdAndRemove(id)
  res.redirect('/courses')
})

router.get("/course/create", async function (req, res, next) {
  const categories = await Category.find();

  res.render("addCourse", {
    title: "Add",
    categories,
  });
});

router.post("/course/create", async function (req, res, next) {
  const { name, image, categoryId, price } = req.body;

  const course = new Course({
    name,
    image,
    categoryId: Types.ObjectId(categoryId),
    price
  });

  await course.save();

  res.redirect("/courses");
});

module.exports = router;