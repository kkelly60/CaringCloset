const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const imageDetailsSchema = require('./imageDetails'); // Import the schema correctly
app.use(express.json({ limit: '50mb' }));
app.use(cors());

const JWT_SECRET = "bdibqibfqibfdibqdouh9h";
const mongoUrl = "mongodb+srv://kkelly:CaringCloset@cluster0.i1puxtq.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));

require('./userDetails');

const User = mongoose.model('UserInfo');
const ImageDetails = mongoose.model('ImageDetails', imageDetailsSchema); // Use the schema here

app.post("/register", async (req, res) => {
  console.log('Received registration request body:', req.body);

  const { fname, lname, email, password, userType } = req.body;

  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.json({ error: "User Exists" });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fname,
      lname,
      email,
      password: encryptedPassword,
      userType
    });

    res.json({ status: "ok" });
  } catch (error) {
    res.json({ status: "error" });
  }
});

// Route to handle user login
app.post("/login-user", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.json({ error: "User Not Found" });
  }

  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET);
    res.json({ status: "ok", data: token });
  } else {
    res.json({ status: "error", error: "Invalid Password" });
  }
});

// Route to get user data based on token
app.post("/userData", async (req, res) => {
  const { token } = req.body;

  try {
    const user = jwt.verify(token, JWT_SECRET);
    console.log(user);
    const useremail = user.email;
    User.findOne({ email: useremail })
      .then((data) => {
        res.json({ status: "ok", data: data });
      })
      .catch((error) => {
        res.json({ status: "error", data: error });
      });
  } catch (error) {
    res.json({ status: "error", data: error });
  }
});

// Route handler for image upload
app.post("/upload-image", async (req, res) => {
  try {
    const { base64, description, age, color, gender } = req.body;

    // Create a new ImageDetails document with the provided data
    const newImageDetails = await ImageDetails.create({
      imageUrl: base64,
      description,
      age,
      color,
      gender
    });

    // Respond with the newly created image document
    res.json({ Status: "ok", data: newImageDetails });
  } catch (error) {
    // If an error occurs, respond with an error message
    console.error('Image upload error:', error);
    res.status(500).json({ Status: "error", message: "Failed to upload image" });
  }
});

// Route to fetch image details
app.get("/image-details", async (req, res) => {
  try {
    // Query MongoDB using Mongoose to retrieve image details
    const imageDetails = await ImageDetails.find(); // Example query, adjust as needed

    // Send back the retrieved image details as the response
    res.json(imageDetails);
  } catch (error) {
    // Handle errors, if any
    console.error('Error fetching image details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Start the server
const PORT = 5542;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
