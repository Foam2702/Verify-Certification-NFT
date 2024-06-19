
const addressModel = require("../models/AddressModel")
module.exports = {
    getAddressPub: async (req, res) => {
        const { address } = req.params;
        const result = await addressModel.getOneAddressPub(address);
        res.json({
            code: 200,
            status: "success",
            address: result
        })
    },
    insertAdressPub: async (req, res) => {
        const { address, publicKey } = req.body;

        // Check if address or publicKey is undefined
        if (address === undefined || publicKey === undefined) {
            return; // Optionally, you can send a response indicating the issue
        }

        // Check for specific error object in the request
        if ((address && address.code === 4001 && address.message === 'User rejected the request.') ||
            (publicKey && publicKey.code === 4001 && publicKey.message === 'User rejected the request.')) {
            return; // Optionally, you can send a response indicating the issue
        }

        await addressModel.insertAddressPub(address, publicKey);
        res.json({
            code: 200,
            status: "success",
        });
    }
}