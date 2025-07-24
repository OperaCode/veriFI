import React, { useState } from "react";
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

  return (
    <div>
      <header className="bg-gray-900 text-white p-4 text-center">
        <h1 className="text-2xl font-bold">VeriFI</h1>
        <p className="text-sm">
          Verify incoming ETH transactions with ENS lookup
        </p>
      </header>
      <main className="max-w-4xl mx-auto p-4">
        <form onSubmit={handleSubmit} className="my-6 text-center">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter wallet address"
            className="border p-2 w-96"
          />
          <button type="submit" className="bg-blue-600 text-white p-2 ml-2">
            Check
          </button>
        </form>
        {submittedAddress && (
            <div>
                <TransactionList address={submittedAddress} provider={provider} />
                <TokenTransfers address={submittedAddress} />

            </div>

        )}
      </main>
    </div>
  );
};

export default Home;
