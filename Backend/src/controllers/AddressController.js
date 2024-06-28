
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
        console.log(user)
        const exist = await addressModel.getOneAddressPub(address);
        if (exist.length == 0) {
            res.json({
                code: 404,
                status: "fail",
                message: "Must sign to get public key first"
            })
        }
        const encUser = {
            citizenId: user.citizenId ? JSON.stringify(await encDecData.encryptData(user.citizenId, encDecData.remove0x(exist[0].publickey))) : null,
            name: user.name ? JSON.stringify(await encDecData.encryptData(user.name, encDecData.remove0x(exist[0].publickey))) : null,
            region: user.region ? JSON.stringify(await encDecData.encryptData(user.region, encDecData.remove0x(exist[0].publickey))) : null,
            dob: user.dob ? JSON.stringify(await encDecData.encryptData(user.dob, encDecData.remove0x(exist[0].publickey))) : null,
            gender: user.gender ? JSON.stringify(await encDecData.encryptData(user.gender, encDecData.remove0x(exist[0].publickey))) : null,
            email: user.email ? JSON.stringify(await encDecData.encryptData(user.email, encDecData.remove0x(exist[0].publickey))) : null,
            workUnit: user.workUnit ? JSON.stringify(await encDecData.encryptData(user.workUnit, encDecData.remove0x(exist[0].publickey))) : null,
        };
        // console.log(encUser)
        const result = await addressModel.updateInfo(address, encUser)
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