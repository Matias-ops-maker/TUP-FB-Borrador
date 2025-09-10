import { sequelize } from "../config/db.js";
import defineUser from "./User.js";
import defineCategory from "./Category.js";
import defineProduct from "./Product.js";
import defineOrder from "./Order.js";
import defineOrderItem from "./OrderItem.js";
import defineCart from "./Cart.js";
import defineCartItem from "./CartItem.js";

// Inicializar modelos
const User = defineUser(sequelize);
const Category = defineCategory(sequelize);
const Product = defineProduct(sequelize);
const Order = defineOrder(sequelize);
const OrderItem = defineOrderItem(sequelize);
const Cart = defineCart(sequelize);
const CartItem = defineCartItem(sequelize);

// Relaciones

// Productos y categorías
Category.hasMany(Product, { foreignKey: "categoryId" });
Product.belongsTo(Category, { foreignKey: "categoryId" });

// Usuarios y órdenes
User.hasMany(Order, { foreignKey: "userId" });
Order.belongsTo(User, { foreignKey: "userId" });

// Ordenes y detalles de orden
Order.hasMany(OrderItem, { foreignKey: "orderId" });
OrderItem.belongsTo(Order, { foreignKey: "orderId" });
Product.hasMany(OrderItem, { foreignKey: "productId" });
OrderItem.belongsTo(Product, { foreignKey: "productId" });

// Carrito de usuario
User.hasOne(Cart, { foreignKey: "userId" });
Cart.belongsTo(User, { foreignKey: "userId" });

// Carrito y items
Cart.hasMany(CartItem, { foreignKey: "cartId" });
CartItem.belongsTo(Cart, { foreignKey: "cartId" });
Product.hasMany(CartItem, { foreignKey: "productId" });
CartItem.belongsTo(Product, { foreignKey: "productId" });

// Exportar modelos y sequelize
export {
    sequelize,
    User,
    Category,
    Product,
    Order,
    OrderItem,
    Cart,
    CartItem
};