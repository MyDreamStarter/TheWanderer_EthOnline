require("dotenv").config()
import dotenv from "dotenv"
dotenv.config()
import "@nomicfoundation/hardhat-verify"
import "@nomiclabs/hardhat-truffle5"
import "@nomiclabs/hardhat-waffle"
import "hardhat-gas-reporter"
import "solidity-coverage"

import "@typechain/hardhat"
import "@nomiclabs/hardhat-ethers"

import { task } from "hardhat/config"

// TESTNET
const AMOY_RPC_URL =
    process.env.AMOY_RPC_URL ||
    "https://polygon-mumbai.g.alchemy.com/v2/api-key"

const CARDONA_RPC_URL =
    "https://polygonzkevm-cardona.g.alchemy.com/v2/owht4PVz1OsDlodwQItax87rn2_FmpTu"

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || "https://ETH-RPC-URL"

const BASE_TESTNET_RPC_URL =
    process.env.BASE_TESTNET_RPC_URL || "wss://base-sepolia-rpc.publicnode.com"

const PEAQ_AUGUNG_TESTNET = "https://rpcpc1-qa.agung.peaq.network"

//// MAINNET
const POLYGON_RPC_URL =
    process.env.POLYGON_RPC_URL ||
    "https://polygon-mainnet.g.alchemy.com/v2/Ht2z0yT67T5cxQZoASKdrkDoWNjPoyw7"

const MANTA_RPC_URL = "https://pacific-rpc.manta.network/http"

const BASE_RPC_URL = process.env.BASE_RPC_URL || "https://mainnet.base.org"

const MNEMONIC =
    process.env.MNEMONIC ||
    "ajkskjfjksjkf ssfaasff asklkfl klfkas dfklhao asfj sfk klsfjs fkjs"
const PRIVATE_KEY = process.env.PRIVATE_KEY

const POLYGONSCAN_API_KEY =
    process.env.POLYGONSCAN_API_KEY || "lklsdkskldjklgdklkld"

const POLYGONZKEVMSCAN_API_KEY = "J9HPEMS8DIKTY6UGFASZBGCVWYCDY3NZ3D"
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "Etherscan API key"
const BASESCAN_API_KEY = process.env.BASESCAN_API_KEY || "Basescan API Key"

module.exports = {
    solidity: {
        version: "0.8.20",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200,
            },
        },
    },
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            initialBaseFeePerGas: 0, // workaround from https://github.com/sc-forks/solidity-coverage/issues/652#issuecomment-896330136 . Remove when that issue is closed.
        },
        // TESTNET NETWORKS
        amoy: {
            networkId: 80002,
            url: AMOY_RPC_URL,
            accounts: [PRIVATE_KEY],
            // accounts: {
            //   mnemonic: MNEMONIC,
            // },
        },
        cardona: {
            networkId: 2442,
            url: CARDONA_RPC_URL,
            accounts: [PRIVATE_KEY],
            // accounts: {
            //   mnemonic: MNEMONIC,
            // },
        },
        sepolia: {
            networkId: 11155111,
            url: SEPOLIA_RPC_URL,
            accounts: [PRIVATE_KEY],
            // accounts: {
            //   mnemonic: MNEMONIC,
            // },
        },
        baseTestnet: {
            networkId: 84532,
            url: BASE_TESTNET_RPC_URL,
            // accounts : [PRIVATE_KEY],
            accounts: {
                mnemonic: MNEMONIC,
            },
        },

        augungTestnet: {
            networkId: 9990,
            url: PEAQ_AUGUNG_TESTNET,
            // accounts : [PRIVATE_KEY],
            accounts: {
                mnemonic: MNEMONIC,
            },
        },
        polygon: {
            networkId: 137,
            url: POLYGON_RPC_URL,
            accounts: [PRIVATE_KEY],
        },
        manta: {
            networkId: 169,
            url: MANTA_RPC_URL,
            accounts: [PRIVATE_KEY],
        },
        base: {
            networkId: 8453,
            url: BASE_RPC_URL,
            accounts: [PRIVATE_KEY],
            // accounts: {
            //     mnemonic: MNEMONIC,
            // },
        },
    },
    gasReporter: {
        enabled: process.env.REPORT_GAS !== undefined,
        currency: "USD",
    },
    etherscan: {
        apiKey: {
            polygon: POLYGONSCAN_API_KEY,
            polygonAmoy: POLYGONSCAN_API_KEY,
            sepolia: ETHERSCAN_API_KEY,
            baseSepolia: BASESCAN_API_KEY,
            polygonZkEVMTestnet: POLYGONZKEVMSCAN_API_KEY,
            base: BASESCAN_API_KEY,
        },
    },
    paths: {
        sources: "./contracts",
        tests: "./test",
        cache: "./cache",
        artifacts: "./artifacts",
    },
    mocha: {
        timeout: 20000,
    },
}
