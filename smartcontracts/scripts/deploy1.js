// imports
const { ethers, run, network } = require("hardhat");
// async main
async function main() {
  const PoapNftFactory = await ethers.getContractFactory("ActuallyMetIRL");
  console.log("Deploying contract...");

  const Poap = await PoapNftFactory.deploy();
  await Poap.deployed();
  console.log(`Deployed contract to: ${Poap.address}`);
  if (network.name != "hardhat") {
    console.log("Waiting for block confirmations...");
    await Poap.deployTransaction.wait(6);
    await verify(Poap.address, []);
  }
}

// async function verify(contractAddress, args) {
const verify = async (contractAddress, args) => {
  console.log("Verifying contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified!");
    } else {
      console.log(e);
    }
  }
};

// main
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
