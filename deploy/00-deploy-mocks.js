const { developmentChains } = require("../helper-hardhat-config")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    // From the docs. It costs 0.25 LINK per request
    const BASE_FEE = ethers.utils.parseEther("0.25")
    const GAS_PRICE_LINK = 1e9
    // Adding fake decimals and initial value to pass them in the MockAggregator
    const DECIMALS = 8
    const INITIAL_ANSWER = 100000000000

    if (developmentChains.includes(network.name)) {
        log("Local network detected! Deploying mocks...")

        // Deploy a mock vrfCoordinator --> get it from Chainlink contracts
        await deploy("VRFCoordinatorV2Mock", {
            from: deployer,
            log: true,
            // This mock takes two parameters: baseFee and gasPriceLink
            args: [BASE_FEE, GAS_PRICE_LINK],
        })

        // Deploy MockAggregator to get fake priceFeed
        await deploy("MockV3Aggregator", {
            from: deployer,
            log: true,
            args: [DECIMALS, INITIAL_ANSWER],
        })

        log("Mocks Deployed!")
        log("-------------------------------------------")
    }
}

module.exports.tags = ["all", "mocks"]
