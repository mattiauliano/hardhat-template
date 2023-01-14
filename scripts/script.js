const { ethers, network } = require("hardhat")

async function main() {
    const contract = await ethers.getContract("Contract")
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
