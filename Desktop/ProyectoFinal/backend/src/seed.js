import dotenv from 'dotenv';
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
} from './models/index.js';
import bcryptjs from 'bcryptjs';

(async () => {
  try {
    await sequelize.sync({ force: true });
    const passAdmin = await bcryptjs.hash('admin123', 10);
    await User.create({
      nombre: 'Administrador',
      email: 'admin@repuestos.com',
      password: passAdmin,
      rol: 'admin'
    });

    const passUser = await bcryptjs.hash('user123', 10);
    const user1 = await User.create({
      nombre: 'Juan PÃ©rez',
      email: 'juan@gmail.com',
      password: passUser,
      rol: 'user'
    });

    const user2 = await User.create({
      nombre: 'MarÃ­a GarcÃ­a',
      email: 'maria@gmail.com',
      password: passUser,
      rol: 'user'
    });

    await Cart.create({ user_id: user1.id });
    await Cart.create({ user_id: user2.id });

    const motor = await Category.create({ nombre: 'Motor' });
    const filtros = await Category.create({ nombre: 'Filtros' });
    const frenos = await Category.create({ nombre: 'Frenos' });
    const pastillas = await Category.create({ nombre: 'Pastillas de freno' });
    const aceites = await Category.create({ nombre: 'Aceites y lubricantes' });
    const encendido = await Category.create({ nombre: 'Sistema de encendido' });
    await Category.create({ nombre: 'SuspensiÃ³n' });
    const transmision = await Category.create({ nombre: 'TransmisiÃ³n' });

    const bosch = await Brand.create({ nombre: 'Bosch' });
    const mann = await Brand.create({ nombre: 'Mann Filter' });
    const castrol = await Brand.create({ nombre: 'Castrol' });
    const ngk = await Brand.create({ nombre: 'NGK' });
    const brembo = await Brand.create({ nombre: 'Brembo' });
    const ferodo = await Brand.create({ nombre: 'Ferodo' });
    const mahle = await Brand.create({ nombre: 'Mahle' });
    await Brand.create({ nombre: 'Monroe' });
    const gates = await Brand.create({ nombre: 'Gates' });
    const liquiMoly = await Brand.create({ nombre: 'Liqui Moly' });

    const vehicles = await Vehicle.bulkCreate([
      { marca: 'Volkswagen', modelo: 'Golf', aÃ±o_desde: 2010, aÃ±o_hasta: 2020, motor: '1.6 TDI' },
      { marca: 'Volkswagen', modelo: 'Polo', aÃ±o_desde: 2015, aÃ±o_hasta: null, motor: '1.0 TSI' },
      { marca: 'Ford', modelo: 'Focus', aÃ±o_desde: 2012, aÃ±o_hasta: 2018, motor: '2.0 TDCi' },
      { marca: 'Ford', modelo: 'Fiesta', aÃ±o_desde: 2013, aÃ±o_hasta: null, motor: '1.6 Ti-VCT' },
      { marca: 'Chevrolet', modelo: 'Cruze', aÃ±o_desde: 2011, aÃ±o_hasta: 2019, motor: '1.8 LT' },
      { marca: 'Toyota', modelo: 'Corolla', aÃ±o_desde: 2014, aÃ±o_hasta: null, motor: '1.8 Hybrid' },
      { marca: 'Honda', modelo: 'Civic', aÃ±o_desde: 2016, aÃ±o_hasta: null, motor: '1.5 VTEC' },
      { marca: 'Nissan', modelo: 'Sentra', aÃ±o_desde: 2013, aÃ±o_hasta: 2020, motor: '1.6 16V' }
    ]);

    const products = await Product.bulkCreate([

      {
        sku: 'F001',
        nombre: 'Filtro de Aceite W 712/75',
        descripcion: 'Filtro de aceite compatible con motores VW/Audi 1.6-2.0 TDI',
        precio: 3500.00,
        costo: 2100.00,
        imagen_url: 'https:
        stock: 25,
        estado: 'activo',
        brand_id: mann.id,
        category_id: filtros.id
      },
      {
        sku: 'F002',
        nombre: 'Filtro de Aire C 25 114',
        descripcion: 'Filtro de aire para VW Golf, Polo y Audi A3',
        precio: 2800.00,
        costo: 1680.00,
        imagen_url: 'https:
        stock: 30,
        estado: 'activo',
        brand_id: mann.id,
        category_id: filtros.id
      },
      {
        sku: 'F003',
        nombre: 'Filtro Combustible FF5052',
        descripcion: 'Filtro de combustible para motores diesel',
        precio: 4200.00,
        costo: 2520.00,
        imagen_url: 'https:
        stock: 22,
        estado: 'activo',
        brand_id: bosch.id,
        category_id: filtros.id
      },
      {
        sku: 'F004',
        nombre: 'Filtro Cabina LA440',
        descripcion: 'Filtro antipolen para mÃ¡xima pureza del aire',
        precio: 3200.00,
        costo: 1920.00,
        imagen_url: 'https:
        stock: 35,
        estado: 'activo',
        brand_id: mahle.id,
        category_id: filtros.id
      },
      {
        sku: 'F005',
        nombre: 'Filtro Hydraulico HU7003X',
        descripcion: 'Filtro hidrÃ¡ulico para transmisiones automÃ¡ticas',
        precio: 4800.00,
        costo: 2880.00,
        imagen_url: 'https:
        stock: 18,
        estado: 'activo',
        brand_id: mann.id,
        category_id: filtros.id
      },
      {
        sku: 'F006',
        nombre: 'Filtro Gasolina G6302',
        descripcion: 'Filtro de combustible para motores nafteros',
        precio: 3800.00,
        costo: 2280.00,
        imagen_url: 'https:
        stock: 28,
        estado: 'activo',
        brand_id: bosch.id,
        category_id: filtros.id
      },
      {
        sku: 'F007',
        nombre: 'Filtro Aire Motor C30005',
        descripcion: 'Filtro de aire de alto rendimiento',
        precio: 3600.00,
        costo: 2160.00,
        imagen_url: 'https:
        stock: 32,
        estado: 'activo',
        brand_id: mahle.id,
        category_id: filtros.id
      },
      {
        sku: 'F008',
        nombre: 'Filtro Aceite OX153D1',
        descripcion: 'Filtro de aceite ecolÃ³gico biodegradable',
        precio: 4100.00,
        costo: 2460.00,
        imagen_url: 'https:
        stock: 26,
        estado: 'activo',
        brand_id: mahle.id,
        category_id: filtros.id
      },

      {
        sku: 'B001',
        nombre: 'Pastillas de Freno Delanteras Brembo',
        descripcion: 'Pastillas de freno cerÃ¡micas para eje delantero',
        precio: 12000.00,
        costo: 7200.00,
        imagen_url: 'https:
        stock: 15,
        estado: 'activo',
        brand_id: brembo.id,
        category_id: pastillas.id
      },
      {
        sku: 'B002',
        nombre: 'Pastillas de Freno Traseras Ferodo',
        descripcion: 'Pastillas de freno orgÃ¡nicas para eje trasero',
        precio: 8500.00,
        costo: 5100.00,
        imagen_url: 'https:
        stock: 18,
        estado: 'activo',
        brand_id: ferodo.id,
        category_id: pastillas.id
      },
      {
        sku: 'B003',
        nombre: 'Disco de Freno Ventilado',
        descripcion: 'Disco de freno ventilado 280mm',
        precio: 15800.00,
        costo: 9480.00,
        imagen_url: 'https:
        stock: 25,
        estado: 'activo',
        brand_id: brembo.id,
        category_id: frenos.id
      },
      {
        sku: 'B004',
        nombre: 'Cilindro Freno Rueda TRW',
        descripcion: 'Cilindro de freno para rueda trasera',
        precio: 6800.00,
        costo: 4080.00,
        imagen_url: 'https:
        stock: 20,
        estado: 'activo',
        brand_id: ferodo.id,
        category_id: frenos.id
      },
      {
        sku: 'B005',
        nombre: 'Zapatas de Freno Traseras',
        descripcion: 'Zapatas de freno para freno de tambor',
        precio: 7200.00,
        costo: 4320.00,
        imagen_url: 'https:
        stock: 16,
        estado: 'activo',
        brand_id: ferodo.id,
        category_id: frenos.id
      },
      {
        sku: 'B006',
        nombre: 'LÃ­quido de Frenos DOT 4',
        descripcion: 'LÃ­quido de frenos de alta performance',
        precio: 2800.00,
        costo: 1680.00,
        imagen_url: 'https:
        stock: 40,
        estado: 'activo',
        brand_id: castrol.id,
        category_id: frenos.id
      },
      {
        sku: 'B007',
        nombre: 'Pastillas CerÃ¡micas Premium',
        descripcion: 'Pastillas de freno cerÃ¡micas de alta gama',
        precio: 18500.00,
        costo: 11100.00,
        imagen_url: 'https:
        stock: 12,
        estado: 'activo',
        brand_id: brembo.id,
        category_id: pastillas.id
      },
      {
        sku: 'B008',
        nombre: 'Disco Freno Trasero SÃ³lido',
        descripcion: 'Disco de freno trasero para vehÃ­culos compactos',
        precio: 9500.00,
        costo: 5700.00,
        imagen_url: 'https:
        stock: 22,
        estado: 'activo',
        brand_id: brembo.id,
        category_id: frenos.id
      },

      {
        sku: 'A001',
        nombre: 'Aceite Motor 5W-30 SintÃ©tico',
        descripcion: 'Aceite de motor totalmente sintÃ©tico',
        precio: 8500.00,
        costo: 5100.00,
        imagen_url: 'https:
        stock: 50,
        estado: 'activo',
        brand_id: castrol.id,
        category_id: aceites.id
      },
      {
        sku: 'A002',
        nombre: 'Aceite Motor 10W-40 SemisintÃ©tico',
        descripcion: 'Aceite semisintÃ©tico para uso general',
        precio: 5800.00,
        costo: 3480.00,
        imagen_url: 'https:
        stock: 45,
        estado: 'activo',
        brand_id: castrol.id,
        category_id: aceites.id
      },
      {
        sku: 'A003',
        nombre: 'Aceite TransmisiÃ³n ATF Dextron VI',
        descripcion: 'Fluido para transmisiones automÃ¡ticas',
        precio: 12500.00,
        costo: 7500.00,
        imagen_url: 'https:
        stock: 25,
        estado: 'activo',
        brand_id: liquiMoly.id,
        category_id: aceites.id
      },
      {
        sku: 'A004',
        nombre: 'Grasa Multiuso Litio',
        descripcion: 'Grasa multiuso para rodamientos y chasÃ­s',
        precio: 3200.00,
        costo: 1920.00,
        imagen_url: 'https:
        stock: 35,
        estado: 'activo',
        brand_id: liquiMoly.id,
        category_id: aceites.id
      },
      {
        sku: 'A005',
        nombre: 'Aceite Motor Diesel 15W-40',
        descripcion: 'Aceite especÃ­fico para motores diesel',
        precio: 7200.00,
        costo: 4320.00,
        imagen_url: 'https:
        stock: 30,
        estado: 'activo',
        brand_id: castrol.id,
        category_id: aceites.id
      },
      {
        sku: 'A006',
        nombre: 'Aditivo Limpiador Motor',
        descripcion: 'Aditivo para limpieza interna del motor',
        precio: 4500.00,
        costo: 2700.00,
        imagen_url: 'https:
        stock: 28,
        estado: 'activo',
        brand_id: liquiMoly.id,
        category_id: aceites.id
      },
      {
        sku: 'A007',
        nombre: 'Refrigerante Anticongelante',
        descripcion: 'LÃ­quido refrigerante concentrado G12++',
        precio: 3800.00,
        costo: 2280.00,
        imagen_url: 'https:
        stock: 42,
        estado: 'activo',
        brand_id: liquiMoly.id,
        category_id: aceites.id
      },
      {
        sku: 'A008',
        nombre: 'Aceite Caja Manual 75W-90',
        descripcion: 'Aceite para cajas manuales y diferenciales',
        precio: 9800.00,
        costo: 5880.00,
        imagen_url: 'https:
        stock: 20,
        estado: 'activo',
        brand_id: castrol.id,
        category_id: aceites.id
      },

      {
        sku: 'E001',
        nombre: 'BujÃ­as Iridium NGK ILKAR7B11',
        descripcion: 'BujÃ­as de iridio para mÃ¡ximo rendimiento',
        precio: 8500.00,
        costo: 5100.00,
        imagen_url: 'https:
        stock: 24,
        estado: 'activo',
        brand_id: ngk.id,
        category_id: encendido.id
      },
      {
        sku: 'E002',
        nombre: 'Cables de BujÃ­a 8mm',
        descripcion: 'Juego de cables de alta tensiÃ³n',
        precio: 12000.00,
        costo: 7200.00,
        imagen_url: 'https:
        stock: 18,
        estado: 'activo',
        brand_id: ngk.id,
        category_id: encendido.id
      },
      {
        sku: 'E003',
        nombre: 'Bobina de Encendido Individual',
        descripcion: 'Bobina de encendido para motores modernos',
        precio: 15800.00,
        costo: 9480.00,
        imagen_url: 'https:
        stock: 15,
        estado: 'activo',
        brand_id: bosch.id,
        category_id: encendido.id
      },
      {
        sku: 'E004',
        nombre: 'Distribuidor Completo',
        descripcion: 'Distribuidor con tapa y rotor incluido',
        precio: 28500.00,
        costo: 17100.00,
        imagen_url: 'https:
        stock: 8,
        estado: 'activo',
        brand_id: bosch.id,
        category_id: encendido.id
      },
      {
        sku: 'E005',
        nombre: 'Sensor de PosiciÃ³n CigÃ¼eÃ±al',
        descripcion: 'Sensor CKP para sistema de inyecciÃ³n',
        precio: 8900.00,
        costo: 5340.00,
        imagen_url: 'https:
        stock: 12,
        estado: 'activo',
        brand_id: bosch.id,
        category_id: encendido.id
      },
      {
        sku: 'E006',
        nombre: 'Modulo de Encendido ElectrÃ³nico',
        descripcion: 'MÃ³dulo de control de encendido',
        precio: 24000.00,
        costo: 14400.00,
        imagen_url: 'https:
        stock: 6,
        estado: 'activo',
        brand_id: bosch.id,
        category_id: encendido.id
      },
      {
        sku: 'E007',
        nombre: 'BujÃ­as Convencionales BP6ES',
        descripcion: 'BujÃ­as estÃ¡ndar para motores carburados',
        precio: 2800.00,
        costo: 1680.00,
        imagen_url: 'https:
        stock: 50,
        estado: 'activo',
        brand_id: ngk.id,
        category_id: encendido.id
      },
      {
        sku: 'E008',
        nombre: 'Condensador de Encendido',
        descripcion: 'Condensador para sistemas clÃ¡sicos',
        precio: 1500.00,
        costo: 900.00,
        imagen_url: 'https:
        stock: 30,
        estado: 'activo',
        brand_id: bosch.id,
        category_id: encendido.id
      },

      {
        sku: 'T001',
        nombre: 'Correa de DistribuciÃ³n Gates',
        descripcion: 'Correa de distribuciÃ³n reforzada',
        precio: 8500.00,
        costo: 5100.00,
        imagen_url: 'https:
        stock: 20,
        estado: 'activo',
        brand_id: gates.id,
        category_id: transmision.id
      },
      {
        sku: 'T002',
        nombre: 'Kit DistribuciÃ³n Completo',
        descripcion: 'Kit con correa, tensores y bomba de agua',
        precio: 28000.00,
        costo: 16800.00,
        imagen_url: 'https:
        stock: 10,
        estado: 'activo',
        brand_id: gates.id,
        category_id: transmision.id
      },
      {
        sku: 'T003',
        nombre: 'Embrague Kit 3 Piezas',
        descripcion: 'Kit de embrague disco, plato y collarin',
        precio: 45000.00,
        costo: 27000.00,
        imagen_url: 'https:
        stock: 8,
        estado: 'activo',
        brand_id: mahle.id,
        category_id: transmision.id
      },
      {
        sku: 'T004',
        nombre: 'Correa Alternador Poly-V',
        descripcion: 'Correa de accesorios multicanal',
        precio: 4200.00,
        costo: 2520.00,
        imagen_url: 'https:
        stock: 25,
        estado: 'activo',
        brand_id: gates.id,
        category_id: transmision.id
      },
      {
        sku: 'T005',
        nombre: 'Tensor de Correa AutomÃ¡tico',
        descripcion: 'Tensor automÃ¡tico para correa de accesorios',
        precio: 12500.00,
        costo: 7500.00,
        imagen_url: 'https:
        stock: 15,
        estado: 'activo',
        brand_id: gates.id,
        category_id: transmision.id
      },
      {
        sku: 'T006',
        nombre: 'Rodamiento Embrague',
        descripcion: 'CollarÃ­n de embrague de liberaciÃ³n',
        precio: 8900.00,
        costo: 5340.00,
        imagen_url: 'https:
        stock: 18,
        estado: 'activo',
        brand_id: mahle.id,
        category_id: transmision.id
      },
      {
        sku: 'T007',
        nombre: 'Bomba de Agua Completa',
        descripcion: 'Bomba de agua con junta incluida',
        precio: 15600.00,
        costo: 9360.00,
        imagen_url: 'https:
        stock: 12,
        estado: 'activo',
        brand_id: gates.id,
        category_id: motor.id
      },
      {
        sku: 'T008',
        nombre: 'Cadena de DistribuciÃ³n',
        descripcion: 'Cadena de distribuciÃ³n para motores TSI',
        precio: 18500.00,
        costo: 11100.00,
        imagen_url: 'https:
        stock: 8,
        estado: 'activo',
        brand_id: mahle.id,
        category_id: transmision.id
      }
    ]);

    const fitments = [

      { product_id: products[0].id, vehicle_id: vehicles[0].id },
      { product_id: products[0].id, vehicle_id: vehicles[1].id },

      { product_id: products[1].id, vehicle_id: vehicles[0].id },
      { product_id: products[1].id, vehicle_id: vehicles[1].id },

      { product_id: products[8].id, vehicle_id: vehicles[0].id },
      { product_id: products[8].id, vehicle_id: vehicles[2].id },
      { product_id: products[8].id, vehicle_id: vehicles[4].id },

      { product_id: products[9].id, vehicle_id: vehicles[0].id },
      { product_id: products[9].id, vehicle_id: vehicles[2].id },

      { product_id: products[32].id, vehicle_id: vehicles[0].id },
      { product_id: products[32].id, vehicle_id: vehicles[1].id },
      { product_id: products[32].id, vehicle_id: vehicles[2].id },

      { product_id: products[24].id, vehicle_id: vehicles[1].id },
      { product_id: products[24].id, vehicle_id: vehicles[3].id },
      { product_id: products[24].id, vehicle_id: vehicles[4].id },
      { product_id: products[24].id, vehicle_id: vehicles[5].id },
      { product_id: products[24].id, vehicle_id: vehicles[6].id },

      { product_id: products[16].id, vehicle_id: vehicles[0].id },
      { product_id: products[16].id, vehicle_id: vehicles[1].id },
      { product_id: products[16].id, vehicle_id: vehicles[2].id },
      { product_id: products[16].id, vehicle_id: vehicles[3].id },
      { product_id: products[16].id, vehicle_id: vehicles[4].id },
      { product_id: products[16].id, vehicle_id: vehicles[5].id },

      { product_id: products[2].id, vehicle_id: vehicles[0].id },
      { product_id: products[2].id, vehicle_id: vehicles[2].id }
    ];

    await Fitment.bulkCreate(fitments);

    process.exit(0);
  } catch (err) {
    process.exit(1);
  }
})();


