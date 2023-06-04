const Datos = artifacts.require("Datos");

module.exports = async function (deployer){
    await deployer.deploy(Datos);
};