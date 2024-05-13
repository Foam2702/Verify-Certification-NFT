import SOULBOUND from '../artifacts/contracts/SoulboundToken.sol/SoulboundToken.json'
import { createContext, useContext, useState, useEffect } from 'react';

const SOULBOUND_ADDRESS = process.env.REACT_APP_SOULBOUND_ADDRESS
const { ethers } = require("ethers");

let SignerContext = createContext(); // Initialize SignerContext here
const useSigner = () => useContext(SignerContext);
export const SignerProvider = ({ children }) => {
    const [signer, setSigner] = useState(null);
    const [address, setAddress] = useState(null);
    const [loading, setLoading] = useState(false);
    const [processing, setProcessing] = useState(false)
    useEffect(() => {
        if (window.ethereum) {
            connectMetaMask();
            window.ethereum.on("accountsChanged", connectMetaMask);
        }
    }, [])
    // const connectMetaMask = async () => {
    //     try {
    //         const { ethereum } = window
    //         if (!ethereum || !ethereum.isMetaMask) {
    //             throw new Error('Please install MetaMask.');
    //         }
    //         let provider = new ethers.providers.Web3Provider(ethereum);
    //         let signer = provider.getSigner();
    //         let address = await signer.getAddress();
    //         //const account = await ethereum.request({ method: 'eth_requestAccounts' });
    //         setAdress(address);
    //         setSigner(signer)
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

    const connectMetaMask = async () => {

        if (processing) {
            console.log("Already processing eth_requestAccounts. Please wait.");
            return;
        }

        setProcessing(true);

        const { ethereum } = window;
        if (!ethereum) {
            console.log("Install MetaMask");
        } else {
            console.log("Wallet exists");
        }
        try {
            const account = await ethereum.request({ method: 'eth_requestAccounts' });
            setAddress(account[0]);
        } catch (err) {
            console.log(err)
        }
        finally {
            setProcessing(false);
        }
    };
    const contextValue = { address, connectMetaMask };
    return (
        <SignerContext.Provider value={contextValue}>
            {children}
        </SignerContext.Provider>
    );

}
export default useSigner