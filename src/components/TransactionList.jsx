import React, { useEffect, useState } from "react";
import { useFetchTransactions } from "../hooks/useFetchTx";
import TransactionItem from "./TransactionItem";
import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider(import.meta.env.VITE_RPC_URL);

const TransactionList = ({ address }) => {
  const { transactions, loading } = useFetchTransactions(address);
  const [ensMap, setEnsMap] = useState({});

  useEffect(() => {
    const resolveENS = async () => {
      const newEnsMap = {};
      for (let tx of transactions) {
        const from = tx.from;
        if (!newEnsMap[from]) {
          try {
            const ensName = await provider.lookupAddress(from);
            newEnsMap[from] = ensName || null;
          } catch (err) {
            console.error(`ENS lookup failed for ${from}:`, err);
            newEnsMap[from] = null;
          }
        }
      }
      setEnsMap(newEnsMap);
    };

    if (transactions && transactions.length > 0) resolveENS();
  }, [transactions]);

  if (loading) return <p>Loading transactions...</p>;

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-2">Incoming Transactions</h2>
      {!transactions || transactions.length === 0 ? (
        <p>No incoming transactions found.</p>
      ) : (
        transactions.map((tx, index) => (
          <TransactionItem
            key={tx.hash || index}
            tx={tx}
            ensName={ensMap[tx.from]}
          />
        ))
      )}
    </div>
  );
};

export default TransactionList;
