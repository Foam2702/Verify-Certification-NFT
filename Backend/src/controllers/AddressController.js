
const addressModel = require("../models/AddressModel")
const encDecData = require("../service/EncDec")

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
        if (address === undefined || publicKey === undefined) {
            return;
        }
        if ((address && address.code === 4001 && address.message === 'User rejected the request.') ||
            (publicKey && publicKey.code === 4001 && publicKey.message === 'User rejected the request.')) {
            return;
        }
        const result = await addressModel.insertAddressPub(address, publicKey);
        if (result) {
            res.json({
                code: 200,
                status: "success",
                message: "Sign successfully"
            });
        }
        else {
            res.json({
                code: 404,
                status: "fail",
                message: result
            });
        }

    },
    insertAddress: async (req, res) => {
        const { address } = req.query;
        const result = await addressModel.insertAddress(address);
        if (result == true) {
            res.json({
                code: 200,
                status: "success",
                message: "Inserted successfully"
            });
        }
        else {
            res.json({
                code: 404,
                status: "fail",
                message: "Inserted fail"
            });
        }
    },

    updateInfo: async (req, res) => {
        const { address } = req.params;
        const user = req.body;
        user.citizenId = JSON.stringify(user.citizenId)
        user.email = JSON.stringify(user.email)
        user.name = JSON.stringify(user.name)
        user.region = JSON.stringify(user.region)
        user.workUnit = JSON.stringify(user.workUnit)
        user.dob = JSON.stringify(user.dob)
        user.gender = JSON.stringify(user.gender)
        const result = await addressModel.updateInfo(address, user)
        if (result) {
            res.json({
                code: 200,
                status: "success",
                message: "Updated successfully"
            })
        }
        else {
            res.json({
                code: 404,
                status: "fail",
                message: "Updated fail"
            })
        }
    },

}