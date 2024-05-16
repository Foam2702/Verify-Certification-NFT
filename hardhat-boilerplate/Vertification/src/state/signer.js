import { createContext, useContext, useState, useEffect } from 'react';
import Web3Modal from 'web3modal'
const { ethers } = require("ethers");

let SignerContext = createContext(); // Initialize SignerContext here
const useSigner = () => useContext(SignerContext);
export const SignerProvider = ({ children }) => {

    const [signer, setSigner] = useState(null);
    const [address, setAddress] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const web3modal = new Web3Modal();
        if (web3modal.cachedProvider) connectWallet();
        window.ethereum.on("accountsChanged", connectWallet);
    }, []);


    const connectWallet = async () => {
        setLoading(true);
        try {
            const web3modal = new Web3Modal({ cacheProvider: true });
            const instance = await web3modal.connect();
            const provider = new ethers.providers.Web3Provider(instance);
            const signer = provider.getSigner();
            const address = await signer.getAddress();
            setSigner(signer);
            setAddress(address);
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
    };
    const contextValue = { signer, loading, address, connectWallet };
    return (
        <SignerContext.Provider value={contextValue}>
            {children}
        </SignerContext.Provider>
    );

}
export default useSigner