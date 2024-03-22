const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const net = require('net');
const { exec } = require('child_process');

app.use(express.json({ limit: '50mb' }));
app.use(cors());

const JWT_SECRET = "bdibqibfqibfdibqdouh9h";
const mongoUrl = "mongodb+srv://kkelly:CaringCloset@cluster0.i1puxtq.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
    startServer(); // Start the server after successfully connecting to the database
  })
  .catch((e) => console.log(e));

require('./userDetails');
require('./imageDetails');

const User = mongoose.model('UserInfo');
const Images = mongoose.model("ImageDetails");

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

// Route handler for user login
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

// Route handler to get user data based on token
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

// Route to handle image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "src", "images")); // Specify the correct path to your images folder
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });
app.post("/upload-image", upload.single("image"), async (req, res) => {
  console.log(req.body); // Log the request body to verify the form data
  console.log(req.file); // Log the uploaded file details

  const imageName = req.file.filename;
  const { description, age, color, gender } = req.body;

  try {
    await Images.create({ image: imageName, description, age, color, gender });
    res.json({ status: "ok", message: "Upload successful", additionalData });


  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ status: "error", error: "Failed to upload image" });
  }
});


app.get("/get-image", async (req, res) => {
  try {
    Images.find({}).then((data) => {
      res.send({ status: "ok", data: data });
    });
  } catch (error) {
    res.json({ status: error });
  }
});


// Define your product schema
const productSchema = new mongoose.Schema({
  description: String,
  age: Number,
  color: String,
  gender: String,
  image: String,
});

const Product = mongoose.model('Product', productSchema);

app.get("/product/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ status: "ok", data: product });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

async function isPortInUse(port) {
  return new Promise(resolve => {
    const tester = net.createServer()
      .once('error', () => resolve(true))
      .once('listening', () => {
        tester.once('close', () => resolve(false)).close();
      })
      .listen(port);
  });
}

async function killProcessOnPort(port) {
  return new Promise((resolve, reject) => {
    exec(`netstat -ano | findstr :${port}`, (error, stdout) => {
      if (error) {
        reject(error);
        return;
      }
      const pidMatch = stdout.match(/\b(\d+)\r?\n?$/);
      if (pidMatch) {
        const pid = parseInt(pidMatch[1]);
        exec(`taskkill /PID ${pid} /F`, killError => {
          if (killError) {
            reject(killError);
          } else {
            resolve();
          }
        });
      } else {
        resolve(); // No process found using the port
      }
    });
  });
}

async function startServer() {
  const port = 5542;
  const isPortAvailable = await isPortInUse(port);
  if (isPortAvailable) {
    await killProcessOnPort(port);
  }

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}
