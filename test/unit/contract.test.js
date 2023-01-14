const { assert, expect } = require("chai")
const { ethers, deployments } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Contract Unit Tests", () => {
          let deployer
          let contract

          beforeEach(async () => {
              const accounts = await ethers.getSigners()
              deployer = accounts[0]
              await deployments.fixture(["contract"])
              contract = await ethers.getContract("Contract", deployer)
          })

          describe("constructor", () => {})
      })
