// permite acceder a donde estamos en las carpetas, o donde nos estamos moviendo en el PY, no importa si es local o en la nube
const path = require("path");

// archivo para trabajar con HTML
const HtmlWebPackPlugin = require("html-webpack-plugin");

const CopyWebPackPlugin = require("copy-webpack-plugin");

// Modulo para exportar, donde esta cada configuracion de lo que va a suceder, es un objeto
module.exports = {
  // punto de entrada, donde vive el codigo inicial y parte el desarrollo
  entry: "./src/index.js",
  // donde vamos a poner el PY ya estructurado y compilado listo para produccion
  output: {
    // hacia donde lo voy a poner, resolve para saber donde se encuentra(donde se encuentre la carpeta, nombre de la carpeta )
    path: path.resolve(__dirname, "dist"),
    // como se va a llamar el archivo que voy a generar
    filename: "main.js",
  },
  // trabaja con las extensiones de nuestro proyecto
  resolve: {
    // arreglo de las extensiones a utilizar
    extensions: [".js"],
  },
  // creamos un modulo con las reglas que vamos a trabajar
  module: {
    rules: [
      {
        // estructura de babel, test de como identificamos los archivos segun los que estan en el entorno
        // va atener un regex para establecer valores que filtraremos extensiones js
        test: /\.js?$/,
        // excluir la carpeta nodemodules, excluye todos los archivos js
        exclude: /node_modules/,
        // utiliza un loader o config establecida
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  // plugins a utilizar
  plugins: [
    new HtmlWebPackPlugin({
      // establezco lo que necesito
      // inject como voy a inyectar un valor a un archivo HTML
      inject: true,
      // donde se encuentra el template principal
      template: "./public/index.html",
      // hacia donde lo vamos a mandar o donde se guardará, establecemos un nombre
      filename: "./index.html",
    }),
    new CopyWebPackPlugin({
      patterns: [
        {
          from: "./src/styles/styles.css",
          to: "",
        },
      ],
    }),
  ],
};
