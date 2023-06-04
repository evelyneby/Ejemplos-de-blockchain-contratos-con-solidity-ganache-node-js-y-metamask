const CrowdfundingProject = artifacts.require("CrowdfundingProject");

module.exports = async function (deployer){
    await deployer.deploy(CrowdfundingProject);
};