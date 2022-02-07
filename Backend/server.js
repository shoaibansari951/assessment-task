const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
app.use(bodyParser.json());
app.use(cors());
const Product = require('./models/Products/Products');
const Cart  = require('./models/Carts/Cart');
const Order = require('./models/Order/Order');
app.use(express.static('./src'));

const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './src/public/images');
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
})

const upload = multer({ storage: storage })




mongoose.connect("mongodb+srv://shoaib:shoaib786@cluster0.pdd3a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    // useNewurlParser: true,
    // uselinifiedTopology: true
}).then(() => console.log("Connected to DB")).catch(console.error);
app.get('/products', async (req, res) => {
    const products = await Product.find();
    res.send(products);
});


app.post('/products', upload.single("image"), async (req, res) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        image: req.file.originalname,
    });
    await product.save();
    res.send(product);
});

app.post('/cart/:id', async (req, res) => {
    const updatedCart= await Cart.findOneAndDelete({ _id: req.params.id });
    res.send(updatedCart);
    // , { $inc: { quantity: 1 } }
});
app.post('/cart02/:id', async (req, res) => {
    const updatedCart= await Cart.findOneAndUpdate({ _id: req.params.id },{ $inc: { quantity: -1 } });
    await updatedCart.save();
    res.send(updatedCart);
});
app.post('/cart03/:id', async (req, res) => {
    const updatedCart= await Cart.findOneAndUpdate({ _id: req.params.id },{ $inc: { quantity: 1 } });
    await updatedCart.save();
    res.send(updatedCart);
});
app.post('/cart/:name/:image/:price',async( req,res)=>{
    const cart = new Cart({
        name: req.params.name,
        price: req.params.price,
        quantity: 1,
        image: req.params.image,
    });
    await cart.save();
    res.send(cart);
})
app.get('/cart', async (req, res) => {
    const products = await Cart.find();
    res.send(products);
})
app.post('/checkout/:total', async (req, res) => {
    const details= await Cart.find();
    const total= req.params.total;
    
    const order = new Order({
        details: details,
        total: total,
        timestamp: req.body.timestamp,
    });
    await order.save();
    res.send(order);
})
app.post ('/sendmail', async (req,res)=>{
    "use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });
  if(info.messageId)
  {
      console.log("Message sent: %s", info.messageId);
      res.send("Message sent");
  }
  else 
  {
        console.log("Message not sent");
        res.send("Message not sent");
  }
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);

    // res.send("mail sent");
});
app.listen(3001, () => console.log("Server started at port 3001"));