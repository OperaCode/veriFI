import React, { useEffect, useState } from "react";
// import { ClipboardIcon } from "@heroicons/react/outline";
import { Copy } from "lucide-react";
import axios from "axios";

const TokenTransfers = ({ address }) => {
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

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
        } else if (
          data.status === "0" &&
          data.message === "No transactions found"
        ) {
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

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  if (!address) return <p>Please provide a valid wallet address.</p>;
  if (loading) return <p>Loading token transfers...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">ERC20 Token Transfers</h2>
      {transfers.length === 0 && !loading ? (
        <p>No token transfers found.</p>
      ) : (
        <>
          <ul>
            {transfers.map((tx) => (
              <li key={tx.hash} className="border-b py-2">
                <div>
                  Token: {tx.tokenName} ({tx.tokenSymbol})
                </div>
                <div>
                  From: <span>{tx.from}</span>
                  <button onClick={() => copyToClipboard(tx.from)}>
                    <Copy className="h-4 w-4 ml-2 text-gray-500" />
                  </button>
                </div>
                <div>To: {tx.to}</div>
                <div>Amount: {Number(tx.value) / 10 ** tx.tokenDecimal}</div>
                <div>
                  Date: {new Date(tx.timeStamp * 1000).toLocaleString()}
                </div>
                <div>
                  <a
                    href={`https://etherscan.io/tx/${tx.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    View on Etherscan
                  </a>
                </div>
              </li>
            ))}
          </ul>
          {!loading && (
            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
            >
              Load More
            </button>
          )}
        </>
      )}
      {loading && <p>Loading token transfers...</p>}
    </div>
  );
};

export default TokenTransfers;
