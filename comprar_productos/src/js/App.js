// Variables globales
// let web3;
let contrato;
let cuenta;
let DIRECCION_CONTRATO = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
let ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "vendedor",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "monto",
        "type": "uint256"
      }
    ],
    "name": "FondosRetirados",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "nombre",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "precio",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "cantidad",
        "type": "uint256"
      }
    ],
    "name": "ProductoAgregado",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "nombre",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "precio",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "cantidad",
        "type": "uint256"
      }
    ],
    "name": "ProductoComprado",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_nombre",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_precio",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_cantidad",
        "type": "uint256"
      }
    ],
    "name": "agregarProducto",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "cantidadProductos",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "cargarProductos",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "nombre",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "precio",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "cantidad",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_cantidad",
        "type": "uint256"
      }
    ],
    "name": "comprarProducto",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "consultarSaldo",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "getPrecio",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "productos",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "nombre",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "precio",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "cantidad",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "retirarFondos",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "saldos",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];


// Función para conectarse a MetaMask
async function conectarMetaMask() {
try {
// Primero, comprobamos si MetaMask está instalado
if (typeof window.ethereum !== 'undefined') {
// Solicitamos permiso para acceder a la cuenta del usuario
const cuentas = await window.ethereum.request({ method: 'eth_requestAccounts' });
cuenta = cuentas[0];
// Creamos una instancia de Web3 para interactuar con la red Ethereum
web3 = new Web3(window.ethereum);
// Creamos una instancia de nuestro contrato inteligente
contrato = new web3.eth.Contract( ABI, DIRECCION_CONTRATO);
// Mostramos el estado de conexión
document.getElementById('estadoConexión').innerHTML = `Conectado a MetaMask con la cuenta ${cuenta}`;
} else {
// Si MetaMask no está instalado, mostramos un mensaje de error
document.getElementById('estadoConexión').innerHTML = 'Por favor, instale MetaMask para continuar';
}
} catch (error) {
// Si se produce algún error, lo mostramos en la consola del navegador
console.error(error);
}
}

function obtenerValorCambioETHMXN() {
  const url = 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=mxn';

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      const precioETH = data.ethereum.mxn;
      return precioETH;
    })
    .catch(error => {
      console.error('Error al obtener el valor de cambio ETH/MXN:', error);
    });
}



// Función para agregar un producto
async function agregarProducto() {
// Obtenemos los valores del formulario
const nombre = document.getElementById('nombre').value;
const precio = document.getElementById('precio').value;
const cantidad = document.getElementById('cantidad').value;
const valorCambioETH_MXN = await obtenerValorCambioETHMXN();
const precioEther = precio/valorCambioETH_MXN;

console.log(precioEther);
try {
// Llamamos al método "agregarProducto" del contrato inteligente
const p= web3.utils.toWei(precioEther.toString(), 'ether');
console.log(p);
await contrato.methods.agregarProducto(nombre, p, cantidad).send({ from: cuenta });

// Limpiamos el formulario y mostramos un mensaje de éxito
document.getElementById('nombre').value = '';
document.getElementById('precio').value = '';
document.getElementById('cantidad').value = '';
//document.getElementById('estadoAgregar').innerHTML = `El producto "${nombre}" ha sido agregado con éxito`;
} catch (error) {
// Si se produce algún error, lo mostramos en la consola del navegador
console.error(error);
}
}

// Función para comprar un producto
async function comprarProducto() {
try {
// Llamamos al método "comprarProducto" del contrato inteligente
const id= document.getElementById('productoId').value;
const cantidad= document.getElementById('productoCant').value;

console.log(id);
console.log(cantidad);

const pre= await contrato.methods.getPrecio(id).call();
console.log(pre);
await contrato.methods.comprarProducto(id, cantidad).send({ from: cuenta, value: pre });
// Mostramos un mensaje de éxito
document.getElementById(`estadoCompra${id}`).innerHTML = 'La compra ha sido realizada con éxito';
} catch (error) {
// Si se produce algún error, lo mostramos en la consola del navegador
console.error(error);
}
}



// Función para comprar un producto
async function comprarProductoT(id) {
  try {

  
  console.log(id);
  
  const pre= await contrato.methods.getPrecio(id).call();
  const cantidad=1;
  await contrato.methods.comprarProducto(id, cantidad).send({ from: cuenta, value: pre });
  // Mostramos un mensaje de éxito
  document.getElementById(`estadoCompra${id}`).innerHTML = 'La compra ha sido realizada con éxito';
  } catch (error) {
  // Si se produce algún error, lo mostramos en la consola del navegador
  console.error(error);
  }
  }






// Función para cargar productos
async function cargarProductos() { 
try {

  const cantidadProductos = await contrato.methods.cantidadProductos().call();
const productox = [];


for (let i = 0; i < cantidadProductos; i++) {
  
  const producto = await contrato.methods.cargarProductos(i).call();
  
  productox.push(producto);
}


/** // Llamamos al método "obtenerProductos" del contrato inteligente
const productos = await contrato.methods.obtenerProductos().call();
// Creamos una tabla con los productos**/

let tabla = '<table class="table"><thead><tr><th>ID</th><th>Nombre</th><th>Precio(ETH)</th><th>Comprar</th><th>Estado</th></tr></thead><tbody>';
for (let i = 0; i < cantidadProductos; i++) {
tabla += `<tr><td>${productox[i].id}</td><td>${productox[i].cantidad}</td><td>${web3.utils.fromWei(productox[i].precio, 'ether')}</td><td><button type="button" class="btn btn-primary" onclick="comprarProductoT(${productox[i].id})">Comprar</button></td><td><span id="estadoCompra${productox[i].id}"></span></td></tr>`;
}
tabla += '</tbody></table>';
// Mostramos la tabla en la página
document.getElementById('productosTabla').innerHTML = tabla;

} catch (error) {
// Si se produce algún error, lo mostramos en la consola del navegador
console.error(error);
}
}
// Función para consultar el saldo
async function consultarSaldo() {
try {
// Obtenemos el saldo de la cuenta conectada
const saldo = await web3.eth.getBalance(cuenta);
// Mostramos el saldo en la página
document.getElementById('saldo').innerHTML = `Su saldo es de ${web3.utils.fromWei(saldo,
'ether')} ETH`;
} catch (error) {
// Si se produce algún error, lo mostramos en la consola del navegador
console.error(error);
}
}
// Función para retirar fondos por el vendedor
async function retirarFondos() {
try {
// Llamamos al método "retirarFondos" del contrato inteligente
await contrato.methods.retirarFondos().send({ from: cuenta });
// Mostramos un mensaje de éxito
document.getElementById('estadoRetirar').innerHTML = 'Los fondos han sido retirados con éxito';
} catch (error) {
// Si se produce algún error, lo mostramos en la consola del navegador
console.error(error);
}

}
// Función principal
async function main() {
// Conectamos con MetaMask
await conectarMetaMask();
// Cargamos los productos
await cargarProductos();
// Consultamos el saldo
await consultarSaldo();

const badd = document.getElementById('agregar');
const bacom = document.getElementById('comp');

badd.addEventListener('click', async function(event) {
  event.preventDefault(); // Evita el comportamiento predeterminado del botón
  await agregarProducto(); // Llama a tu función personalizada
});
bacom.addEventListener('click', async function(event) {
  event.preventDefault(); // Evita el comportamiento predeterminado del botón
  await comprarProducto(); // Llama a tu función personalizada
});

}
// Ejecutamos la función principal al cargar la página
window.addEventListener('load', main);