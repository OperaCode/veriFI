import React, { useState } from "react";
import { motion } from "framer-motion";
import TransactionList from "../components/TransactionList";
import TokenTransfers from "../components/TokenTransfer";
import { JsonRpcProvider } from "ethers";

const provider = new JsonRpcProvider(import.meta.env.VITE_RPC_URL);

const Home = () => {
  const [address, setAddress] = useState("");
  const [submittedAddress, setSubmittedAddress] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedAddress(address);
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-md py-4 px-6 shadow-lg border-b border-blue-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            VeriFI
          </h1>
          <nav className="space-x-6">
            <a href="/home" className="text-gray-300 hover:text-blue-400 transition-colors">Home</a>
            <a href="/#features" className="text-gray-300 hover:text-blue-400 transition-colors">Features</a>
            <a href="/#how-it-works" className="text-gray-300 hover:text-blue-400 transition-colors">How It Works</a>
            <a href="/#faq" className="text-gray-300 hover:text-blue-400 transition-colors">FAQ</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-6">
        <motion.section {...fadeInUp} className="text-center my-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Verify Your ETH Transactions
          </h2>
          <p className="text-lg text-gray-300 mb-6">
            Enter your wallet address to view incoming ETH transactions with ENS lookup.
          </p>
          <form onSubmit={handleSubmit} className="flex justify-center items-center space-x-4">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter Ethereum wallet address"
              className="bg-gray-800 border border-blue-800/50 text-white placeholder-gray-400 p-3 rounded-lg w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 py-3 rounded-lg text-white font-semibold shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Check
            </button>
          </form>
        </motion.section>

        {submittedAddress && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="bg-gray-900/50 p-6 rounded-lg shadow-md border border-blue-800/50">
              <h3 className="text-xl font-semibold text-gray-200 mb-4">ETH Transactions</h3>
              <TransactionList address={submittedAddress} provider={provider} />
            </div>
            <div className="bg-gray-900/50 p-6 rounded-lg shadow-md border border-blue-800/50">
              <h3 className="text-xl font-semibold text-gray-200 mb-4">Token Transfers</h3>
              <TokenTransfers address={submittedAddress} />
            </div>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-8 bg-gray-900 text-center border-t border-blue-800/50">
        <div className="max-w-7xl mx-auto">
          <p className="text-gray-400">
            Built by{" "}
            <a href="https://github.com/OperaCode" className="underline hover:text-blue-400">
              Opera
            </a>{" "}
            | Powered by ethers.js & Etherscan API
          </p>
          <p className="mt-4 text-sm text-gray-500">
            © {new Date().getFullYear()} VeriFI. Decentralized & Transparent.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;