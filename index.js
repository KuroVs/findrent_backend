const db = require('./config/db');
const express = require('express');
const swaggerUi = require('swagger-ui-express');       // ✅ NUEVO
const swaggerSpec = require('./config/swagger');   

db.raw('select 1+1 as result')
  .then(() => console.log('✅ Conectado a PostgreSQL con Knex'))
  .catch(err => console.error('❌ Error de conexión:', err));


const app = express();

app.use(express.json());

// Importar rutas

// ✅ Ruta de documentación
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const propertiesRoutes = require('./routes/properties.routes');
const ownersRoutes = require('./routes/owners.routes');
const amenitiesRoutes = require('./routes/amenities.routes');


app.use('/properties', propertiesRoutes);
app.use('/owners', ownersRoutes);
app.use('/amenities', amenitiesRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Documentación: http://localhost:3000/api-docs`);
});