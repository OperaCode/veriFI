import React from "react";
import { motion } from "framer-motion";
import { Copy } from "lucide-react";

const TransactionItem = ({ tx, ensName }) => {
  const ethValue = parseFloat(tx.value) / 10 ** 18;
  const date = new Date(tx.timeStamp * 1000).toLocaleString();

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <>
      <td className="py-3 px-4">
        <span className="flex items-center">
          {ensName ? (
            <>
              {ensName} ({tx.from.slice(0, 6)}...{tx.from.slice(-4)})
            </>
          ) : (
            <>
              {tx.from.slice(0, 6)}...{tx.from.slice(-4)}
            </>
          )}
          <button
            onClick={() => copyToClipboard(tx.from)}
            className="ml-2 text-gray-400 hover:text-blue-400"
          >
            <Copy className="h-4 w-4" />
          </button>
        </span>
      </td>
      <td className="py-3 px-4">{ethValue.toFixed(6)} ETH</td>
      <td className="py-3 px-4">{date}</td>
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
      
    </>
  );
};

export default TransactionItem;