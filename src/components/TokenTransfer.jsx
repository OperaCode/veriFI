import React, { useEffect, useState } from "react";
import axios from "axios";

const TokenTransfers = ({ address }) => {
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransfers = async () => {
      if (!address) return;

      setLoading(true);
      setError("");

      try {
        const res = await axios.get(`https://api.etherscan.io/api`, {
          params: {
            module: "account",
            action: "tokentx",
            address,
            page: 1,
            offset: 10,
            sort: "desc",
            apikey: import.meta.env.VITE_ETHERSCAN_API_KEY,
          },
        });

        const data = res.data;

        if (data.status === "1" && Array.isArray(data.result)) {
          setTransfers(data.result);
        } else if (data.status === "0" && data.message === "No transactions found") {
          setTransfers([]);
        } else {
          console.error("Etherscan API error:", data.message, data.result);
          setError(`API Error: ${data.message}`);
          setTransfers([]);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to fetch token transfers.");
        setTransfers([]);
      }

      setLoading(false);
    };

    fetchTransfers();
  }, [address]);

  if (!address) return <p>Please provide a valid wallet address.</p>;
  if (loading) return <p>Loading token transfers...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">ERC20 Token Transfers</h2>

      {transfers.length === 0 ? (
        <p>No token transfers found for this address.</p>
      ) : (
        <ul>
          {transfers.map((tx) => (
            <li key={tx.hash} className="border-b py-2">
              <div>Token: {tx.tokenName} ({tx.tokenSymbol})</div>
              <div>From: {tx.from}</div>
              <div>To: {tx.to}</div>
              <div>
                Amount: {Number(tx.value) / (10 ** tx.tokenDecimal)}
              </div>
              <div>
                Date: {new Date(tx.timeStamp * 1000).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TokenTransfers;
