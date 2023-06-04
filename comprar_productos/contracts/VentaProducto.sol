// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract VentaProducto {
    struct Producto {
        uint256 id;
        string nombre;
        uint256 precio; 
        uint256 cantidad;
}

Producto[] public productos;
mapping(address => uint256) public saldos;
address payable vendedor;
event ProductoAgregado(uint256 indexed id, string nombre, uint256 precio, uint256 cantidad);
event ProductoComprado(uint256 indexed id, string nombre, uint256 precio, uint256 cantidad);
event FondosRetirados(address vendedor, uint256 monto);

constructor() {
vendedor = payable(msg.sender);
}

function agregarProducto(string memory _nombre, uint256 _precio, uint256 _cantidad) public {
require(msg.sender == vendedor, "Solo el vendedor puede agregar productos");
uint256 id = productos.length + 1;
productos.push(Producto(id, _nombre, _precio, _cantidad));
emit ProductoAgregado(id, _nombre, _precio, _cantidad);
}

function comprarProducto(uint256 _id, uint256 _cantidad) public payable {
require(_id > 0 && _id <= productos.length, "Producto no existe");
Producto storage producto = productos[_id - 1];
require(producto.cantidad >= _cantidad, "Cantidad insuficiente");
require(msg.value == producto.precio * _cantidad, "Pago insuficiente");
producto.cantidad -= _cantidad;
saldos[msg.sender] += msg.value;
vendedor.transfer(msg.value);
emit ProductoComprado(_id, producto.nombre, producto.precio, _cantidad);
}
/**function cargarProductos() public payable {
require(msg.sender == vendedor, "Solo el vendedor puede cargar productos");
}**/

function cantidadProductos() public view returns (uint256) {
    uint256 cantidad= productos.length;
  return cantidad;
}


function cargarProductos(uint256 _id) public view returns (
    uint256 id,
    string memory nombre,
    uint256 precio,
    uint256 cantidad
) {

    Producto storage producto = productos[_id];
    return (
        producto.id,
        producto.nombre,
        producto.precio,
        producto.cantidad
    );
}


  function getPrecio(uint256 _id) public view returns (uint256) {
    Producto storage producto = productos[_id - 1];
    uint256 cat= producto.precio;
        return cat;
    }


function consultarSaldo() public view returns(uint256) {
return saldos[msg.sender];
}
function retirarFondos() public {
require(msg.sender == vendedor, "Solo el vendedor puede retirar fondos");
uint256 monto = address(this).balance;
vendedor.transfer(monto);
emit FondosRetirados(vendedor, monto);
}
}
