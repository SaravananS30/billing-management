const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Array to store orders
const orders = [];

// Route to show the order form
app.get('/', (req, res) => {
  res.render('order');
});

// Route to process the order form
app.post('/', (req, res) => {
  const { itemName, itemPrice, quantity } = req.body;
  const subtotal = itemPrice * quantity;
  const tax = 0.1 * subtotal;
  const total = subtotal + tax;
  const order = {
    itemName,
    itemPrice,
    quantity,
    subtotal,
    tax,
    total,
  };
  orders.push(order);
  res.render('invoice', { order });
});

// Route to show the list of orders
app.get('/orders', (req, res) => {
  res.render('orders', { orders });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
