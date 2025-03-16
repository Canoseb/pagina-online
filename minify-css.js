const cssnano = require('cssnano');
const postcss = require('postcss');
const fs = require('fs');

// Ruta correcta al archivo CSS
const css = fs.readFileSync('C:/Users/USER/OneDrive/Desktop/Materias 5 semestre/Pagina Web/Styles.css', 'utf8');

postcss([cssnano])
    .process(css, { from: 'C:/Users/USER/OneDrive/Desktop/Materias 5 semestre/Pagina Web/Styles.css', to: 'C:/Users/USER/OneDrive/Desktop/Materias 5 semestre/Pagina Web/Styles.min.css' })
    .then(result => {
        fs.writeFileSync('C:/Users/USER/OneDrive/Desktop/Materias 5 semestre/Pagina Web/Styles.min.css', result.css);
        console.log('Minificación completada');
    })
    .catch(err => {
        console.error('Error al minificar el archivo CSS:', err);
    });