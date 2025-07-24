import React from "react";

const TransactionItem = ({ tx, ensName }) => {
  const ethValue = parseFloat(tx.value) / 10 ** 18;
  const date = new Date(tx.timeStamp * 1000).toLocaleString();

  return (
    <div className="border p-3 mb-2 rounded">
      <p><strong>From:</strong> {ensName ? `${ensName} (${tx.from})` : tx.from}</p>
      <p><strong>Amount:</strong> {ethValue} ETH</p>
      <p><strong>Time:</strong> {date}</p>
    </div>
  );
};

export default TransactionItem;
