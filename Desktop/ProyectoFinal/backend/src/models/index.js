// backend/src/models/index.js
import sequelize from '../config/db.js';
import User from './User.js';
import Product from './Product.js';
import Category from './Category.js';
import Order from './Order.js';
import OrderItem from './OrderItem.js';
import Cart from './Cart.js';
import CartItem from './CartItem.js';

// Relaciones ejemplo (ajusta según tu diagrama ER)
User.hasMany(Order);
Order.belongsTo(User);

Product.belongsTo(Category);
Category.hasMany(Product);

Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);

Cart.belongsTo(User);
User.hasOne(Cart);

Cart.hasMany(CartItem);
CartItem.belongsTo(Cart);

CartItem.belongsTo(Product);
Product.hasMany(CartItem);

// Función para sincronizar modelos
export const syncModels = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Modelos sincronizados con la base de datos.');
  } catch (error) {
    console.error('Error al sincronizar modelos:', error);
  }
};

// Exportación de modelos y sequelize
export {
  sequelize,
  User,
  Product,
  Category,
  Order,
  OrderItem,
  Cart,
  CartItem,
};

/*
const sequelize = require('../config/db');
const User = require('./User');
const Product = require('./Product');
const Category = require('./Category');
const Order = require('./Order');
const OrderItem = require('./OrderItem');
const Cart = require('./Cart');
const CartItem = require('./CartItem');

// Relaciones ejemplo (ajusta según tu diagrama ER)
User.hasMany(Order);
Order.belongsTo(User);

Product.belongsTo(Category);
Category.hasMany(Product);

Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);

Cart.belongsTo(User);
User.hasOne(Cart);

Cart.hasMany(CartItem);
CartItem.belongsTo(Cart);

CartItem.belongsTo(Product);
Product.hasMany(CartItem);

const syncModels = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Modelos sincronizados con la base de datos.');
  } catch (error) {
    console.error('Error al sincronizar modelos:', error);
  }
};

module.exports = {
  sequelize,
  User,
  Product,
  Category,
  Order,
  OrderItem,
  Cart,
  CartItem,
  syncModels,
};
*/