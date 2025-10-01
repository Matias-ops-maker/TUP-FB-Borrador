import dotenv from "dotenv";
dotenv.config();

import { 
    sequelize, 
    User, 
    Category, 
    Brand, 
    Product, 
    Vehicle, 
    Fitment, 
    Cart 
} from "./models/index.js";
import bcryptjs from "bcryptjs";

(async () => {
    try {
        console.log("🌱 Iniciando seed de la base de datos...");
        
        // Sincronizar la DB (force: true borra todo antes)
        await sequelize.sync({ force: true });
        console.log("✅ Base de datos sincronizada");

        // Crear usuarios
        const passAdmin = await bcryptjs.hash("admin123", 10);
        const admin = await User.create({ 
            nombre: "Administrador", 
            email: "admin@repuestos.com", 
            password: passAdmin, 
            rol: "admin"
        });

        const passUser = await bcryptjs.hash("user123", 10);
        const user1 = await User.create({ 
            nombre: "Juan Pérez", 
            email: "juan@gmail.com", 
            password: passUser,
            rol: "user"
        });

        const user2 = await User.create({ 
            nombre: "María García", 
            email: "maria@gmail.com", 
            password: passUser,
            rol: "user"
        });

        console.log("✅ Usuarios creados");

        // Crear carritos
        await Cart.create({ user_id: admin.id });
        await Cart.create({ user_id: user1.id });
        await Cart.create({ user_id: user2.id });

        // Crear marcas
        const bosch = await Brand.create({ nombre: "Bosch" });
        const mann = await Brand.create({ nombre: "Mann Filter" });
        const gates = await Brand.create({ nombre: "Gates" });
        const ngk = await Brand.create({ nombre: "NGK" });
        const mobil = await Brand.create({ nombre: "Mobil 1" });
        const brembo = await Brand.create({ nombre: "Brembo" });
        const ferodo = await Brand.create({ nombre: "Ferodo" });
        const castrol = await Brand.create({ nombre: "Castrol" });
        const valvoline = await Brand.create({ nombre: "Valvoline" });
        const shell = await Brand.create({ nombre: "Shell" });
        const denso = await Brand.create({ nombre: "Denso" });
        const monroe = await Brand.create({ nombre: "Monroe" });
        const bilstein = await Brand.create({ nombre: "Bilstein" });
        const sachs = await Brand.create({ nombre: "Sachs" });
        const lemforder = await Brand.create({ nombre: "Lemförder" });
        const trw = await Brand.create({ nombre: "TRW" });
        const valeo = await Brand.create({ nombre: "Valeo" });
        const mahle = await Brand.create({ nombre: "Mahle" });
        const hella = await Brand.create({ nombre: "Hella" });
        const osram = await Brand.create({ nombre: "Osram" });
        const bardahl = await Brand.create({ nombre: "Bardahl" });
        const eibach = await Brand.create({ nombre: "Eibach" });
        const koni = await Brand.create({ nombre: "Koni" });
        const pirelli = await Brand.create({ nombre: "Pirelli" });
        const michelin = await Brand.create({ nombre: "Michelin" });
        const continental = await Brand.create({ nombre: "Continental" });

        console.log("✅ Marcas creadas");

        // Crear categorías con jerarquía
        const motor = await Category.create({ 
            nombre: "Motor", 
            descripcion: "Componentes del motor" 
        });
        
        const filtros = await Category.create({ 
            nombre: "Filtros", 
            descripcion: "Filtros de motor y habitáculo",
            parent_id: motor.id 
        });
        
        const lubricantes = await Category.create({ 
            nombre: "Lubricantes", 
            descripcion: "Aceites y grasas",
            parent_id: motor.id 
        });

        const frenos = await Category.create({ 
            nombre: "Frenos", 
            descripcion: "Sistema de frenado" 
        });
        
        const pastillas = await Category.create({ 
            nombre: "Pastillas", 
            descripcion: "Pastillas de freno",
            parent_id: frenos.id 
        });

        const transmision = await Category.create({ 
            nombre: "Transmisión", 
            descripcion: "Sistema de transmisión" 
        });

        const encendido = await Category.create({ 
            nombre: "Encendido", 
            descripcion: "Sistema de encendido" 
        });

        const suspension = await Category.create({ 
            nombre: "Suspensión", 
            descripcion: "Sistema de suspensión y dirección" 
        });

        const electrica = await Category.create({ 
            nombre: "Eléctrica", 
            descripcion: "Sistema eléctrico y electrónico" 
        });

        const neumaticos = await Category.create({ 
            nombre: "Neumáticos", 
            descripcion: "Neumáticos y llantas" 
        });

        const escape = await Category.create({ 
            nombre: "Escape", 
            descripcion: "Sistema de escape" 
        });

        const climatizacion = await Category.create({ 
            nombre: "Climatización", 
            descripcion: "Sistema de aire acondicionado" 
        });

        console.log("✅ Categorías creadas");

        // Crear vehículos
        const vehicles = await Vehicle.bulkCreate([
            { marca: "Volkswagen", modelo: "Golf", año_desde: 2010, año_hasta: 2020, motor: "1.6 TDI" },
            { marca: "Volkswagen", modelo: "Polo", año_desde: 2015, año_hasta: null, motor: "1.0 TSI" },
            { marca: "Ford", modelo: "Focus", año_desde: 2012, año_hasta: 2018, motor: "2.0 TDCi" },
            { marca: "Ford", modelo: "Fiesta", año_desde: 2013, año_hasta: null, motor: "1.6 Ti-VCT" },
            { marca: "Chevrolet", modelo: "Cruze", año_desde: 2011, año_hasta: 2019, motor: "1.8 LT" },
            { marca: "Toyota", modelo: "Corolla", año_desde: 2014, año_hasta: null, motor: "1.8 Hybrid" },
            { marca: "Honda", modelo: "Civic", año_desde: 2016, año_hasta: null, motor: "1.5 VTEC" },
            { marca: "Nissan", modelo: "Sentra", año_desde: 2013, año_hasta: 2020, motor: "1.6 16V" }
        ]);

        console.log("✅ Vehículos creados");

        // Crear productos (40 productos variados)
        const products = await Product.bulkCreate([
            // FILTROS (8 productos)
            {
                sku: "F001",
                nombre: "Filtro de Aceite W 712/75",
                descripcion: "Filtro de aceite compatible con motores VW/Audi 1.6-2.0 TDI",
                precio: 3500.00,
                costo: 2100.00,
                imagen_url: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=200&h=150&fit=crop",
                stock: 25,
                estado: "activo",
                brand_id: mann.id,
                category_id: filtros.id
            },
            {
                sku: "F002",
                nombre: "Filtro de Aire C 25 114",
                descripcion: "Filtro de aire para VW Golf, Polo y Audi A3",
                precio: 2800.00,
                costo: 1680.00,
                imagen_url: "https://images.unsplash.com/photo-1632501641765-e568d28b0015?w=200&h=150&fit=crop",
                stock: 30,
                estado: "activo",
                brand_id: mann.id,
                category_id: filtros.id
            },
            {
                sku: "F003",
                nombre: "Filtro Combustible FF5052",
                descripcion: "Filtro de combustible para motores diesel",
                precio: 4200.00,
                costo: 2520.00,
                imagen_url: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=200&h=150&fit=crop",
                stock: 22,
                estado: "activo",
                brand_id: bosch.id,
                category_id: filtros.id
            },
            {
                sku: "F004",
                nombre: "Filtro Cabina LA440",
                descripcion: "Filtro antipolen para máxima pureza del aire",
                precio: 3200.00,
                costo: 1920.00,
                imagen_url: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=200&h=150&fit=crop",
                stock: 35,
                estado: "activo",
                brand_id: mahle.id,
                category_id: filtros.id
            },
            {
                sku: "F005",
                nombre: "Filtro Hydraulico HU7003X",
                descripcion: "Filtro hidráulico para transmisiones automáticas",
                precio: 4800.00,
                costo: 2880.00,
                imagen_url: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=200&h=150&fit=crop",
                stock: 18,
                estado: "activo",
                brand_id: mann.id,
                category_id: filtros.id
            },
            {
                sku: "F006",
                nombre: "Filtro Gasolina G6302",
                descripcion: "Filtro de combustible para motores nafteros",
                precio: 3800.00,
                costo: 2280.00,
                imagen_url: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=200&h=150&fit=crop",
                stock: 28,
                estado: "activo",
                brand_id: bosch.id,
                category_id: filtros.id
            },
            {
                sku: "F007",
                nombre: "Filtro Aire Motor C30005",
                descripcion: "Filtro de aire de alto rendimiento",
                precio: 3600.00,
                costo: 2160.00,
                imagen_url: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=200&h=150&fit=crop",
                stock: 32,
                estado: "activo",
                brand_id: mahle.id,
                category_id: filtros.id
            },
            {
                sku: "F008",
                nombre: "Filtro Aceite OX153D1",
                descripcion: "Filtro de aceite ecológico biodegradable",
                precio: 4100.00,
                costo: 2460.00,
                imagen_url: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=200&h=150&fit=crop",
                stock: 26,
                estado: "activo",
                brand_id: mahle.id,
                category_id: filtros.id
            },

            // FRENOS (8 productos)
            {
                sku: "B001",
                nombre: "Pastillas de Freno Delanteras Brembo",
                descripcion: "Pastillas de freno cerámicas para eje delantero",
                precio: 12000.00,
                costo: 7200.00,
                imagen_url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=200&h=150&fit=crop",
                stock: 15,
                estado: "activo",
                brand_id: brembo.id,
                category_id: pastillas.id
            },
            {
                sku: "B002",
                nombre: "Pastillas de Freno Traseras Ferodo",
                descripcion: "Pastillas de freno orgánicas para eje trasero",
                precio: 8500.00,
                costo: 5100.00,
                imagen_url: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=200&h=150&fit=crop",
                stock: 18,
                estado: "activo",
                brand_id: ferodo.id,
                category_id: pastillas.id
            },
            {
                sku: "B003",
                nombre: "Disco de Freno Ventilado",
                descripcion: "Disco de freno ventilado 280mm",
                precio: 15800.00,
                costo: 9480.00,
                imagen_url: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=200&h=150&fit=crop",
                stock: 25,
                estado: "activo",
                brand_id: brembo.id,
                category_id: frenos.id
            },
            {
                sku: "B004",
                nombre: "Cilindro Freno Rueda TRW",
                descripcion: "Cilindro de freno para rueda trasera",
                precio: 6800.00,
                costo: 4080.00,
                imagen_url: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=200&h=150&fit=crop",
                stock: 12,
                estado: "activo",
                brand_id: trw.id,
                category_id: frenos.id
            },
            {
                sku: "B005",
                nombre: "Liquido de Frenos DOT4",
                descripcion: "Líquido de frenos sintético 500ml",
                precio: 2400.00,
                costo: 1440.00,
                imagen_url: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=200&h=150&fit=crop",
                stock: 50,
                estado: "activo",
                brand_id: bosch.id,
                category_id: frenos.id
            },
            {
                sku: "B006",
                nombre: "Sensor ABS Delantero",
                descripcion: "Sensor de velocidad ABS rueda delantera",
                precio: 8900.00,
                costo: 5340.00,
                imagen_url: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=200&h=150&fit=crop",
                stock: 16,
                estado: "activo",
                brand_id: bosch.id,
                category_id: electrica.id
            },
            {
                sku: "B007",
                nombre: "Pastillas Freno Ceramicas Premium",
                descripcion: "Pastillas cerámicas sin ruido alta gama",
                precio: 18500.00,
                costo: 11100.00,
                imagen_url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=200&h=150&fit=crop",
                stock: 20,
                estado: "activo",
                brand_id: brembo.id,
                category_id: pastillas.id
            },
            {
                sku: "B008",
                nombre: "Kit Reparacion Calipers",
                descripcion: "Kit completo para reparación de calipers",
                precio: 4800.00,
                costo: 2880.00,
                imagen_url: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=200&h=150&fit=crop",
                stock: 14,
                estado: "activo",
                brand_id: trw.id,
                category_id: frenos.id
            },

            // ACEITES Y LUBRICANTES (8 productos)
            {
                sku: "L001",
                nombre: "Aceite Motor 5W-30 Mobil 1",
                descripcion: "Aceite sintético 5W-30 para motores modernos - 4L",
                precio: 8900.00,
                costo: 5340.00,
                imagen_url: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=200&h=150&fit=crop",
                stock: 40,
                estado: "activo",
                brand_id: mobil.id,
                category_id: lubricantes.id
            },
            {
                sku: "L002",
                nombre: "Aceite Motor 10W-40 Castrol",
                descripcion: "Aceite semisintético multigrad 4L",
                precio: 6200.00,
                costo: 3720.00,
                imagen_url: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=200&h=150&fit=crop",
                stock: 35,
                estado: "activo",
                brand_id: castrol.id,
                category_id: lubricantes.id
            },
            {
                sku: "L003",
                nombre: "Aceite Transmision ATF",
                descripcion: "Fluido automático multivehículo 1L",
                precio: 4800.00,
                costo: 2880.00,
                imagen_url: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=200&h=150&fit=crop",
                stock: 28,
                estado: "activo",
                brand_id: mobil.id,
                category_id: lubricantes.id
            },
            {
                sku: "L004",
                nombre: "Refrigerante Concentrado",
                descripcion: "Anticongelante -35°C concentrado 5L",
                precio: 5600.00,
                costo: 3360.00,
                imagen_url: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=200&h=150&fit=crop",
                stock: 22,
                estado: "activo",
                brand_id: castrol.id,
                category_id: lubricantes.id
            },
            {
                sku: "L005",
                nombre: "Grasa Multiproposito",
                descripcion: "Grasa litio multiuso 500g",
                precio: 1800.00,
                costo: 1080.00,
                imagen_url: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=200&h=150&fit=crop",
                stock: 60,
                estado: "activo",
                brand_id: shell.id,
                category_id: lubricantes.id
            },
            {
                sku: "L006",
                nombre: "Aceite Diferencial 90W",
                descripcion: "Aceite para diferenciales y cajas",
                precio: 3200.00,
                costo: 1920.00,
                imagen_url: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=200&h=150&fit=crop",
                stock: 18,
                estado: "activo",
                brand_id: shell.id,
                category_id: lubricantes.id
            },
            {
                sku: "L007",
                nombre: "Aceite 0W-20 Hibridos",
                descripcion: "Aceite especial motores híbridos",
                precio: 12800.00,
                costo: 7680.00,
                imagen_url: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=200&h=150&fit=crop",
                stock: 15,
                estado: "activo",
                brand_id: mobil.id,
                category_id: lubricantes.id
            },
            {
                sku: "L008",
                nombre: "Aditivo Stop Smoke",
                descripcion: "Reductor consumo aceite y humo",
                precio: 2400.00,
                costo: 1440.00,
                imagen_url: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=200&h=150&fit=crop",
                stock: 45,
                estado: "activo",
                brand_id: bardahl.id,
                category_id: lubricantes.id
            },

            // SISTEMA ELÉCTRICO (8 productos)
            {
                sku: "E001",
                nombre: "Batería Bosch S4 60Ah",
                descripcion: "Batería libre mantenimiento 60Ah 540A",
                precio: 18600.00,
                costo: 11160.00,
                imagen_url: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=200&h=150&fit=crop",
                stock: 25,
                estado: "activo",
                brand_id: bosch.id,
                category_id: electrica.id
            },
            {
                sku: "E002",
                nombre: "Alternador 120A Bosch",
                descripcion: "Alternador 14V 120A remanufacturado",
                precio: 28500.00,
                costo: 17100.00,
                imagen_url: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=200&h=150&fit=crop",
                stock: 8,
                estado: "activo",
                brand_id: bosch.id,
                category_id: electrica.id
            },
            {
                sku: "E003",
                nombre: "Motor Arranque Valeo",
                descripcion: "Motor arranque 12V 1.4kW",
                precio: 24800.00,
                costo: 14880.00,
                imagen_url: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=200&h=150&fit=crop",
                stock: 6,
                estado: "activo",
                brand_id: valeo.id,
                category_id: electrica.id
            },
            {
                sku: "E004",
                nombre: "Bobina Encendido NGK",
                descripcion: "Bobina encendido individual",
                precio: 8900.00,
                costo: 5340.00,
                imagen_url: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=200&h=150&fit=crop",
                stock: 20,
                estado: "activo",
                brand_id: ngk.id,
                category_id: encendido.id
            },
            {
                sku: "E005",
                nombre: "Bujias Iridium NGK",
                descripcion: "Juego 4 bujías iridio larga vida",
                precio: 18000.00,
                costo: 10800.00,
                imagen_url: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=200&h=150&fit=crop",
                stock: 15,
                estado: "activo",
                brand_id: ngk.id,
                category_id: encendido.id
            },
            {
                sku: "E006",
                nombre: "Regulador Voltaje Bosch",
                descripcion: "Regulador electrónico 14V",
                precio: 6800.00,
                costo: 4080.00,
                imagen_url: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=200&h=150&fit=crop",
                stock: 12,
                estado: "activo",
                brand_id: bosch.id,
                category_id: electrica.id
            },
            {
                sku: "E007",
                nombre: "Sensor Oxigeno Lambda",
                descripcion: "Sonda lambda universal",
                precio: 9600.00,
                costo: 5760.00,
                imagen_url: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=200&h=150&fit=crop",
                stock: 18,
                estado: "activo",
                brand_id: bosch.id,
                category_id: electrica.id
            },
            {
                sku: "E008",
                nombre: "Cables Bujias NGK",
                descripcion: "Juego cables alta tensión",
                precio: 7200.00,
                costo: 4320.00,
                imagen_url: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=200&h=150&fit=crop",
                stock: 22,
                estado: "activo",
                brand_id: ngk.id,
                category_id: encendido.id
            },

            // SUSPENSIÓN Y DIRECCIÓN (8 productos)
            {
                sku: "S001",
                nombre: "Amortiguador Monroe Delantero",
                descripcion: "Amortiguador hidráulico delantero",
                precio: 12500.00,
                costo: 7500.00,
                imagen_url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=200&h=150&fit=crop",
                stock: 20,
                estado: "activo",
                brand_id: monroe.id,
                category_id: suspension.id
            },
            {
                sku: "S002",
                nombre: "Resorte Eibach Delantero",
                descripcion: "Resorte progresivo deportivo",
                precio: 8900.00,
                costo: 5340.00,
                imagen_url: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=200&h=150&fit=crop",
                stock: 15,
                estado: "activo",
                brand_id: eibach.id,
                category_id: suspension.id
            },
            {
                sku: "S003",
                nombre: "Rotula Suspension TRW",
                descripcion: "Rótula suspensión delantera inferior",
                precio: 6800.00,
                costo: 4080.00,
                imagen_url: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=200&h=150&fit=crop",
                stock: 25,
                estado: "activo",
                brand_id: trw.id,
                category_id: suspension.id
            },
            {
                sku: "S004",
                nombre: "Buje Barra Estabilizadora",
                descripcion: "Buje goma estabilizadora delantera",
                precio: 1800.00,
                costo: 1080.00,
                imagen_url: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=200&h=150&fit=crop",
                stock: 50,
                estado: "activo",
                brand_id: lemforder.id,
                category_id: suspension.id
            },
            {
                sku: "S005",
                nombre: "Copa Amortiguador Monroe",
                descripcion: "Soporte superior amortiguador",
                precio: 4200.00,
                costo: 2520.00,
                imagen_url: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=200&h=150&fit=crop",
                stock: 30,
                estado: "activo",
                brand_id: monroe.id,
                category_id: suspension.id
            },
            {
                sku: "S006",
                nombre: "Terminal Direccion TRW",
                descripcion: "Terminal axial dirección",
                precio: 5600.00,
                costo: 3360.00,
                imagen_url: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=200&h=150&fit=crop",
                stock: 22,
                estado: "activo",
                brand_id: trw.id,
                category_id: suspension.id
            },
            {
                sku: "S007",
                nombre: "Amortiguador Trasero Bilstein",
                descripcion: "Amortiguador gas trasero",
                precio: 18500.00,
                costo: 11100.00,
                imagen_url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=200&h=150&fit=crop",
                stock: 12,
                estado: "activo",
                brand_id: bilstein.id,
                category_id: suspension.id
            },
            {
                sku: "S008",
                nombre: "Rodamiento Rueda Delantera",
                descripcion: "Rodamiento con sensor ABS",
                precio: 9600.00,
                costo: 5760.00,
                imagen_url: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=200&h=150&fit=crop",
                stock: 18,
                estado: "activo",
                brand_id: bosch.id,
                category_id: suspension.id
            }
        ]);

        console.log("✅ Productos creados");

        // Crear compatibilidades producto-vehículo (Fitments)
        const fitments = [
            // Filtro de aceite compatible con Golf y Polo VW
            { product_id: products[0].id, vehicle_id: vehicles[0].id },
            { product_id: products[0].id, vehicle_id: vehicles[1].id },
            
            // Filtro de aire compatible con Golf y Polo VW
            { product_id: products[1].id, vehicle_id: vehicles[0].id },
            { product_id: products[1].id, vehicle_id: vehicles[1].id },
            
            // Pastillas delanteras compatibles con varios modelos
            { product_id: products[2].id, vehicle_id: vehicles[0].id },
            { product_id: products[2].id, vehicle_id: vehicles[2].id },
            { product_id: products[2].id, vehicle_id: vehicles[4].id },
            
            // Pastillas traseras
            { product_id: products[3].id, vehicle_id: vehicles[0].id },
            { product_id: products[3].id, vehicle_id: vehicles[2].id },
            
            // Correa de distribución
            { product_id: products[4].id, vehicle_id: vehicles[0].id },
            { product_id: products[4].id, vehicle_id: vehicles[1].id },
            { product_id: products[4].id, vehicle_id: vehicles[2].id },
            
            // Bujías para motores a nafta
            { product_id: products[5].id, vehicle_id: vehicles[1].id },
            { product_id: products[5].id, vehicle_id: vehicles[3].id },
            { product_id: products[5].id, vehicle_id: vehicles[4].id },
            { product_id: products[5].id, vehicle_id: vehicles[5].id },
            { product_id: products[5].id, vehicle_id: vehicles[6].id },
            
            // Aceite compatible con todos
            { product_id: products[6].id, vehicle_id: vehicles[0].id },
            { product_id: products[6].id, vehicle_id: vehicles[1].id },
            { product_id: products[6].id, vehicle_id: vehicles[2].id },
            { product_id: products[6].id, vehicle_id: vehicles[3].id },
            { product_id: products[6].id, vehicle_id: vehicles[4].id },
            { product_id: products[6].id, vehicle_id: vehicles[5].id },
            
            // Filtro combustible para diesel
            { product_id: products[7].id, vehicle_id: vehicles[0].id },
            { product_id: products[7].id, vehicle_id: vehicles[2].id }
        ];

        await Fitment.bulkCreate(fitments);

        console.log("✅ Compatibilidades creadas");

        console.log("🎉 Seed completado exitosamente!");
        console.log("👤 Admin: admin@repuestos.com / admin123");
        console.log("👤 Usuario: juan@gmail.com / user123");
        console.log("👤 Usuario: maria@gmail.com / user123");
        
        process.exit(0);
    } catch (err) {
        console.error("❌ Error en seed:", err);
        process.exit(1);
    }
})();