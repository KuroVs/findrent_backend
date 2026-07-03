/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {

    // Limpiar en orden correcto (respetar foreign keys)
    await knex('property_amenities').del()
    await knex('properties').del()
    await knex('amenities').del()
    await knex('owners').del()

    // Owners
    await knex('owners').insert([
        {
            type_document: 'CC',
            number_document: '1140812345',
            full_name: 'Carlos',
            last_name: 'Martínez Pérez',
            email: 'carlos.martinez@gmail.com',
            phone: '3001234567',
            status: true
        },
        {
            type_document: 'CC',
            number_document: '32456789',
            full_name: 'Laura',
            last_name: 'Ríos Gómez',
            email: 'laura.rios@gmail.com',
            phone: '3154567890',
            status: true
        },
        {
            type_document: 'CE',
            number_document: '987654321',
            full_name: 'Andrés',
            last_name: 'Vargas Torres',
            email: 'andres.vargas@outlook.com',
            phone: '3209876543',
            status: true
        },
        {
            type_document: 'CC',
            number_document: '71234567',
            full_name: 'María',
            last_name: 'López Herrera',
            email: 'maria.lopez@gmail.com',
            phone: '3112345678',
            status: true
        },
        {
            type_document: 'NIT',
            number_document: '900123456',
            full_name: 'Inversiones',
            last_name: 'Caribe SAS',
            email: 'contacto@inversionescaribe.com',
            phone: '6051234567',
            status: true
        },
    ])

    // Amenidades
    await knex('amenities').insert([
        { name: 'WiFi', description: 'Internet de alta velocidad incluido' },
        { name: 'Parqueadero', description: 'Espacio privado cubierto para vehículo' },
        { name: 'Piscina', description: 'Piscina climatizada para residentes' },
        { name: 'Gimnasio', description: 'Gimnasio equipado con acceso 24/7' },
        { name: 'Vigilancia 24h', description: 'Seguridad privada las 24 horas' },
        { name: 'Aire acondicionado', description: 'Sistema de climatización central' },
        { name: 'Balcón', description: 'Balcón con vista panorámica' },
        { name: 'Ascensor', description: 'Ascensor de alta capacidad' },
    ])

    // Obtener IDs generados
    const owners = await knex('owners').select('id', 'number_document')
    const amenities = await knex('amenities').select('id', 'name')

    const ownerId = (doc) => owners.find(o => o.number_document === doc)?.id
    const amenityId = (name) => amenities.find(a => a.name === name)?.id

    // Properties
    const properties = await knex('properties').insert([
        {
            owner_id: ownerId('1140812345'),
            title: 'Apartamento moderno en El Poblado',
            description: 'Hermoso apartamento con acabados de lujo en el corazón de El Poblado. Cerca de restaurantes, centros comerciales y parques.',
            price: 2800000,
            city: 'Medellín',
            address: 'Calle 10 # 43-12, El Poblado',
            bedrooms: 2,
            bathrooms: 2,
            area_m2: 75,
            is_active: true,
            operation_type: 'RENT'
        },
        {
            owner_id: ownerId('32456789'),
            title: 'Casa campestre en Laureles',
            description: 'Amplia casa con jardín y zona social privada. Excelente ubicación en uno de los sectores más exclusivos de Medellín.',
            price: 4500000,
            city: 'Medellín',
            address: 'Circular 4 # 73-45, Laureles',
            bedrooms: 4,
            bathrooms: 3,
            area_m2: 180,
            is_active: true,
            operation_type: 'RENT'
        },
        {
            owner_id: ownerId('987654321'),
            title: 'Penthouse con vista al mar',
            description: 'Espectacular penthouse con vista panorámica al mar Caribe. Acabados premium y terraza privada.',
            price: 850000000,
            city: 'Cartagena',
            address: 'Calle del Cuartel # 36-55, Bocagrande',
            bedrooms: 3,
            bathrooms: 3,
            area_m2: 220,
            is_active: true,
            operation_type: 'SALE'
        },
        {
            owner_id: ownerId('71234567'),
            title: 'Apartaestudio en Chapinero',
            description: 'Moderno apartaestudio ideal para profesionales. Ubicado en zona de alta valorización cerca de universidades y zonas empresariales.',
            price: 1200000,
            city: 'Bogotá',
            address: 'Carrera 13 # 54-21, Chapinero',
            bedrooms: 1,
            bathrooms: 1,
            area_m2: 42,
            is_active: true,
            operation_type: 'RENT'
        },
        {
            owner_id: ownerId('900123456'),
            title: 'Casa colonial en el Centro Histórico',
            description: 'Hermosa casa colonial restaurada en el Centro Histórico de Cartagena. Patio interior, techos altos y detalles arquitectónicos únicos.',
            price: 1200000000,
            city: 'Cartagena',
            address: 'Calle de la Factoria # 34-12, Centro Histórico',
            bedrooms: 5,
            bathrooms: 4,
            area_m2: 320,
            is_active: true,
            operation_type: 'SALE'
        },
        {
            owner_id: ownerId('1140812345'),
            title: 'Apartamento en Manga',
            description: 'Cómodo apartamento en el tranquilo barrio Manga. Excelente para familias, cerca del parque y supermercados.',
            price: 1500000,
            city: 'Cartagena',
            address: 'Calle Real del Manga # 26-45',
            bedrooms: 3,
            bathrooms: 2,
            area_m2: 95,
            is_active: true,
            operation_type: 'RENT'
        },
        {
            owner_id: ownerId('32456789'),
            title: 'Oficina en el Centro Empresarial',
            description: 'Moderna oficina en el principal centro empresarial de Barranquilla. Ideal para empresas en expansión.',
            price: 3200000,
            city: 'Barranquilla',
            address: 'Carrera 53 # 80-195, Prado',
            bedrooms: 0,
            bathrooms: 2,
            area_m2: 85,
            is_active: true,
            operation_type: 'RENT'
        },
        {
            owner_id: ownerId('71234567'),
            title: 'Casa en Ciudad Jardín',
            description: 'Espaciosa casa en exclusivo sector residencial. Conjunto cerrado con zonas comunes y seguridad privada.',
            price: 680000000,
            city: 'Cali',
            address: 'Calle 16 # 100-45, Ciudad Jardín',
            bedrooms: 4,
            bathrooms: 4,
            area_m2: 250,
            is_active: true,
            operation_type: 'SALE'
        },
        {
            owner_id: ownerId('987654321'),
            title: 'Loft en Usaquén',
            description: 'Elegante loft en el bohemio barrio Usaquén. Ideal para creativos y profesionales. Cerca de restaurantes y galerías de arte.',
            price: 2100000,
            city: 'Bogotá',
            address: 'Calle 118 # 6-43, Usaquén',
            bedrooms: 1,
            bathrooms: 1,
            area_m2: 58,
            is_active: true,
            operation_type: 'RENT'
        },
        {
            owner_id: ownerId('900123456'),
            title: 'Apartamento en Bucaramanga',
            description: 'Cómodo apartamento en zona residencial tranquila. Buena iluminación natural y ventilación cruzada.',
            price: 950000,
            city: 'Bucaramanga',
            address: 'Carrera 27 # 45-12, Cabecera',
            bedrooms: 2,
            bathrooms: 1,
            area_m2: 65,
            is_active: true,
            operation_type: 'RENT'
        },
    ]).returning('id')

    const propertyIds = properties.map(p => p.id)

    // Amenidades por propiedad
    await knex('property_amenities').insert([
        // Apto El Poblado
        { property_id: propertyIds[0], amenity_id: amenityId('WiFi') },
        { property_id: propertyIds[0], amenity_id: amenityId('Parqueadero') },
        { property_id: propertyIds[0], amenity_id: amenityId('Ascensor') },

        // Casa Laureles
        { property_id: propertyIds[1], amenity_id: amenityId('WiFi') },
        { property_id: propertyIds[1], amenity_id: amenityId('Parqueadero') },
        { property_id: propertyIds[1], amenity_id: amenityId('Piscina') },
        { property_id: propertyIds[1], amenity_id: amenityId('Vigilancia 24h') },

        // Penthouse Cartagena
        { property_id: propertyIds[2], amenity_id: amenityId('WiFi') },
        { property_id: propertyIds[2], amenity_id: amenityId('Piscina') },
        { property_id: propertyIds[2], amenity_id: amenityId('Gimnasio') },
        { property_id: propertyIds[2], amenity_id: amenityId('Vigilancia 24h') },
        { property_id: propertyIds[2], amenity_id: amenityId('Aire acondicionado') },
        { property_id: propertyIds[2], amenity_id: amenityId('Balcón') },

        // Apartaestudio Bogotá
        { property_id: propertyIds[3], amenity_id: amenityId('WiFi') },
        { property_id: propertyIds[3], amenity_id: amenityId('Ascensor') },

        // Casa colonial Cartagena
        { property_id: propertyIds[4], amenity_id: amenityId('WiFi') },
        { property_id: propertyIds[4], amenity_id: amenityId('Piscina') },
        { property_id: propertyIds[4], amenity_id: amenityId('Vigilancia 24h') },
        { property_id: propertyIds[4], amenity_id: amenityId('Aire acondicionado') },

        // Apto Manga
        { property_id: propertyIds[5], amenity_id: amenityId('WiFi') },
        { property_id: propertyIds[5], amenity_id: amenityId('Parqueadero') },
        { property_id: propertyIds[5], amenity_id: amenityId('Vigilancia 24h') },

        // Oficina Barranquilla
        { property_id: propertyIds[6], amenity_id: amenityId('WiFi') },
        { property_id: propertyIds[6], amenity_id: amenityId('Aire acondicionado') },
        { property_id: propertyIds[6], amenity_id: amenityId('Ascensor') },

        // Casa Cali
        { property_id: propertyIds[7], amenity_id: amenityId('Parqueadero') },
        { property_id: propertyIds[7], amenity_id: amenityId('Piscina') },
        { property_id: propertyIds[7], amenity_id: amenityId('Gimnasio') },
        { property_id: propertyIds[7], amenity_id: amenityId('Vigilancia 24h') },

        // Loft Bogotá
        { property_id: propertyIds[8], amenity_id: amenityId('WiFi') },
        { property_id: propertyIds[8], amenity_id: amenityId('Ascensor') },
        { property_id: propertyIds[8], amenity_id: amenityId('Balcón') },

        // Apto Bucaramanga
        { property_id: propertyIds[9], amenity_id: amenityId('WiFi') },
        { property_id: propertyIds[9], amenity_id: amenityId('Parqueadero') },
    ])

    console.log('✅ Seed completado: 5 owners, 8 amenidades, 10 propiedades')
}