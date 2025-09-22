const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const multer = require("multer");
const data = require("./model/data");
const { nanoid } = require("nanoid");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");



const app = express();
const port = 3000;





mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connection Established"))
  .catch(() => console.log("Failed to connect"));







app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));







cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// configure multer-storage-cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "wishu", // cloud folder name
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const upload = multer({ storage });




















// ------------------- Routes ------------------- //

app.get("/", (req, res) => {
  res.redirect("home");
});


app.get("/home", (req, res) => {
  res.render("home");
});










app.post("/home", upload.single("image"), async (req, res) => {
  const shortCode = nanoid(11);
  try {
    const { naam, message } = req.body;
    const image = req.file?.path || req.file?.url;
    const setData = new data({ naam, message, image, shortCode });

    await setData.save();
    console.log("Data Saved....");
  } catch (err) {
    console.log("Error while saving data.", err);
    res.redirect("/")
  }

  const link = `${process.env.link}/${shortCode}`;
  res.render("link", { link,shortCode });
});










app.get("/:shortCode", async (req, res) => {
  try {
    const { shortCode } = req.params;
    const wishCard = await data.findOne({ shortCode });

    if (!wishCard) {
      res.redirect("/");
    } else {
      res.render("wish", { wishCard });
    }
  } catch (err) {
    res.redirect("/");
  }
});





app.use((req,res)=>{
  res.status(404).render("404")
})

app.listen(port, () => console.log("Server started...."));