const { Sequelize } = require('sequelize');
const User = require('../../models/user'); // Asegúrate de ajustar la ruta según tu estructura de archivos

const sequelize = new Sequelize('pagweb', 'Sebastian', '123', {
  host: 'localhost',
  dialect: 'mysql', // MySQL2 se especifica de la misma manera que MySQL
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión establecida correctamente.');

    // Eliminar todos los usuarios
    await User.destroy({
      where: {},
      truncate: true
    });
    console.log('Todos los usuarios eliminados con éxito.');

    // Crear 10 usuarios ficticios
    const usuariosFicticios = [
      { id: 1, username: 'Sandra', password: '1', email: 'sandra@correo.com' },
      { id: 2, username: 'Sebastian', password: '2', email: 'seb.astian@correo.com' },
      { id: 3, username: 'Pedro', password: '3', email: 'PedRo@correo.com' },
      { id: 4, username: 'Maria', password: '4', email: 'maria@correo.com' },
      { id: 5, username: 'Luis', password: '5', email: 'luis@correo.com' },
      { id: 6, username: 'Ana', password: '6', email: 'ana@correo.com' },
      { id: 7, username: 'Jorge', password: '7', email: 'jorge@correo.com' },
      { id: 8, username: 'Laura', password: '8', email: 'laura@correo.com' },
      { id: 9, username: 'Carlos', password: '9', email: 'carlos@correo.com' },
      { id: 10, username: 'Carolina', password: '10', email: 'carolina@correo.com' },
    ];

    for (const usuario of usuariosFicticios) {
      await User.create(usuario);
    }

    console.log('10 usuarios ficticios agregados con éxito con IDs específicos.');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  } finally {
    await sequelize.close();
  }
})();