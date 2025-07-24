import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
            page,
            offset: 10,
            sort: "desc",
            apikey: import.meta.env.VITE_ETHERSCAN_API_KEY,
          },
        });

        const data = res.data;

        if (data.status === "1" && Array.isArray(data.result)) {
          setTransfers((prev) => (page === 1 ? data.result : [...prev, ...data.result]));
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
  }, [address, page]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <motion.div
      {...fadeInUp}
      className="mt-6 bg-gray-900/50 rounded-lg shadow-md border border-blue-800/50 p-6"
    >
      <h2 className="text-xl font-semibold text-gray-200 mb-4">
        ERC20 Token Transfers
      </h2>
      {!address ? (
        <p className="text-gray-400 text-center py-4">
          Please provide a valid wallet address.
        </p>
      ) : loading && transfers.length === 0 ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-400"></div>
          <p className="ml-3 text-gray-300">Loading token transfers...</p>
        </div>
      ) : error ? (
        <p className="text-red-400 text-center py-4">{error}</p>
      ) : transfers.length === 0 ? (
        <p className="text-gray-400 text-center py-4">
          No token transfers found for this address.
        </p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-gray-300">
              <thead>
                <tr className="border-b border-blue-800/50">
                  <th className="py-3 px-4 font-semibold text-blue-400">Token</th>
                  <th className="py-3 px-4 font-semibold text-blue-400">From</th>
                  <th className="py-3 px-4 font-semibold text-blue-400">To</th>
                  <th className="py-3 px-4 font-semibold text-blue-400">Amount</th>
                  <th className="py-3 px-4 font-semibold text-blue-400">Date</th>
                  <th className="py-3 px-4 font-semibold text-blue-400">Tx Hash</th>
                </tr>
              </thead>
              <tbody>
                {transfers.map((tx, index) => (
                  <motion.tr
                    key={tx.hash}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`border-b border-blue-800/50 hover:bg-gray-800/50 transition-colors duration-200 ${
                      index % 2 === 0 ? "bg-gray-900/30" : "bg-gray-900/10"
                    }`}
                  >
                    <td className="py-3 px-4">
                      {tx.tokenName} ({tx.tokenSymbol})
                    </td>
                    <td className="py-3 px-4">
                      <span className="flex items-center">
                        {tx.from.slice(0, 6)}...{tx.from.slice(-4)}
                        <button
                          onClick={() => copyToClipboard(tx.from)}
                          className="ml-2 text-gray-400 hover:text-blue-400"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {tx.to.slice(0, 6)}...{tx.to.slice(-4)}
                    </td>
                    <td className="py-3 px-4">
                      {Number(tx.value) / 10 ** tx.tokenDecimal}
                    </td>
                    <td className="py-3 px-4">
                      {new Date(tx.timeStamp * 1000).toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <a
                        href={`https://etherscan.io/tx/${tx.hash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline"
                      >
                        {tx.hash.slice(0, 6)}...{tx.hash.slice(-4)}
                      </a>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          {!loading && transfers.length >= 10 && (
            <motion.button
              onClick={() => setPage((prev) => prev + 1)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg text-white font-semibold shadow-lg transition-all duration-200"
            >
              Load More
            </motion.button>
          )}
          {loading && transfers.length > 0 && (
            <div className="flex justify-center items-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-blue-400"></div>
              <p className="ml-3 text-gray-300">Loading more transfers...</p>
            </div>
          )}
        </>
      )}
    </motion.div>
  );
};

export default TokenTransfers;