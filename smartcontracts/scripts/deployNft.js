// imports
const { ethers, run, network } = require("hardhat");
// async main
async function main() {
  const NftFactory = await ethers.getContractFactory("SimpleRaidNFT");
  console.log("Deploying contract...");

  const Nft = await NftFactory.deploy();
  await Nft.deployed();
  console.log(`Deployed contract to: ${Nft.address}`);
  if (network.name != "hardhat") {
    console.log("Waiting for block confirmations...");
    await Nft.deployTransaction.wait(6);
    await verify(Nft.address, []);
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
