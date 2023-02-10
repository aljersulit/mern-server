const router = require("express").Router();
const User = require("../models/Userschema");

// READ
router.get("/", async (req, res) => {
  await User.find()
    .then((result) => res.json(result))
    .catch((err) => res.status(400).send(err));
});

// CREATE
router.post("/add", async (req, res) => {
  const { fullname, temperature, email, phonenumber } = req.body;
  const newUser = new User({
    fullname,
    temperature,
    email,
    phonenumber,
  });

  await newUser
    .save()
    .then((result) => res.json(result))
    .catch((err) => res.status(400).send(err));
});

// DETAILS
router.get("/:id", async (req, res) => {
  await User.findById(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => res.status(400).send(err));
});

// DELETE
router.delete("/delete/:id", async (req, res) => {
  await User.deleteOne({ _id: req.params.id })
    .then((result) => res.json(result))
    .catch((err) => res.status(400).send(err));
});

// UPDATE
router.put("/update/:id", async (req, res) => {
  await User.updateOne({ _id: req.params.id }, { $set: { ...req.body } })
    .then((result) => res.json(result))
    .catch((err) => res.status(400).send(err));
});

module.exports = router;
