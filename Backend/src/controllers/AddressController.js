
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
        await addressModel.insertAddressPub(address, publicKey);
        res.json({
            code: 200,
            status: "success",
        });
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
        console.log(user)
        // console.log(encUser)
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