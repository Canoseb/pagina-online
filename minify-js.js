const fs = require('fs');
const path = require('path');
const UglifyJS = require('uglify-js');

const archivo = path.join(__dirname, 'script.js');

fs.readFile(archivo, 'utf8', (err, data) => {
    if (err) {
        console.error('Error al leer el archivo:', err);
        return;
    }

    // Minifica el código JavaScript
    const minifiedCode = UglifyJS.minify(data);

    if (minifiedCode.error) {
        console.error('Error al minificar el archivo:', minifiedCode.error);
        return;
    }

    // Guarda el archivo minificado
    const archivoMinificado = path.join(__dirname, 'script.min.js');
    fs.writeFile(archivoMinificado, minifiedCode.code, (err) => {
        if (err) {
            console.error('Error al guardar el archivo minificado:', err);
            return;
        }

        console.log('Archivo minificado guardado en:', archivoMinificado);
    });
});