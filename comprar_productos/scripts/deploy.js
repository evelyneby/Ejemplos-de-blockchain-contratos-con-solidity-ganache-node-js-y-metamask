const { ethers } = require('hardhat');


async function main() {
const VentaProducto = await ethers.getContractFactory('VentaProducto');
const contratoVentaProducto = await VentaProducto.deploy();
await contratoVentaProducto.deployed();
console.log('Contrato desplegado en:', contratoVentaProducto.address);
console.log('ABI:', JSON.stringify(contratoVentaProducto.interface.fragments));
}
main()
.then(() => process.exit(0))
.catch((error) => {
console.error(error);
process.exit(1);
});