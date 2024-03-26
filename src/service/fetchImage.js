async function fetchImage(cid) {
    try {
        const res = await fetch(
            `https://coral-able-takin-320.mypinata.cloud/ipfs/${cid}`
        );
        const resData = await res.text();
        console.log(resData);
    } catch (error) {
        console.log(error);
    }
}

module.exports = fetchImage;