// Import pinata
const pinataSDK = require("@pinata/sdk")
// Handle paths
const path = require("path")
// handle files system
const fs = require("fs")
require("dotenv").config()

/* Setup Pinata */
const pinataApiKey = process.env.PINATA_API_KEY
const pinataApiSecret = process.env.PINATA_API_SECRET
// Initialize it to call function
const pinata = pinataSDK(pinataApiKey, pinataApiSecret)

const storeImages = async (imagesFilePath) => {
    // Solve the given path
    const fullImagesPath = path.resolve(imagesFilePath)
    // Get files from dir
    const files = fs.readdirSync(fullImagesPath)
    let responses = []
    console.log("Uploading to Pinata...")
    for (fileIndex in files) {
        console.log(`Working on ${fileIndex}...`)
        // Create a read stream
        const readableStreamForFile = fs.createReadStream(`${fullImagesPath}/${files[fileIndex]}`)
        const options = {
            pinataMetadata: {
                name: files[fileIndex],
            },
        }
        // Send it
        try {
            await pinata // Returns the hash of the file
                .pinFileToIPFS(readableStreamForFile, options)
                .then((result) => {
                    responses.push(result)
                })
                .catch((err) => {
                    console.log(err)
                })
        } catch (error) {
            console.log(error)
        }
    }
    return { responses, files }
}

async function storeTokenUriMetadata(metadata) {
    const options = {
        pinataMetadata: {
            name: metadata.name,
        },
    }
    try {
        const response = await pinata.pinJSONToIPFS(metadata, options)
        return response
    } catch (error) {
        console.log(error)
    }
    return null
}

module.exports = { storeImages, storeTokenUriMetadata }
