async function fetchImage(cid) {
    try {
        const res = await fetch(
            `https://coral-able-takin-320.mypinata.cloud/ipfs/${cid}`
        );
        const resData = await res.text();
    } catch (error) {
    }
}

module.exports = fetchImage;