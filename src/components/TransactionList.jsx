import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useFetchTransactions } from "../hooks/useFetchTx";
import TransactionItem from "./TransactionItem";
import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider(import.meta.env.VITE_RPC_URL);

const TransactionList = ({ address }) => {
  const { transactions, loading } = useFetchTransactions(address);
  const [ensMap, setEnsMap] = useState({});
  const [blockTimes, setBlockTimes] = useState({});

  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  const totalPages = Math.ceil((transactions?.length || 0) / perPage);

  const paginatedTxs = transactions?.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  // ENS Resolver
  useEffect(() => {
    const resolveENS = async () => {
      const newEnsMap = {};
      for (let tx of paginatedTxs) {
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
      setEnsMap((prev) => ({ ...prev, ...newEnsMap }));
    };

    if (paginatedTxs && paginatedTxs.length > 0) resolveENS();
  }, [paginatedTxs]);

  // Block timestamp resolver
  useEffect(() => {
    const resolveBlockTimes = async () => {
      const times = {};
      for (let tx of paginatedTxs) {
        const blockNum = parseInt(tx.blockNum, 16);
        if (!blockTimes[blockNum]) {
          try {
            const block = await provider.getBlock(blockNum);
            times[blockNum] = block.timestamp;
          } catch (err) {
            console.error(`Block lookup failed for ${blockNum}:`, err);
            times[blockNum] = null;
          }
        }
      }
      setBlockTimes((prev) => ({ ...prev, ...times }));
    };

    if (paginatedTxs && paginatedTxs.length > 0) resolveBlockTimes();
  }, [paginatedTxs]);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <motion.div
      {...fadeInUp}
      className="mt-6 bg-gray-900/50 rounded-lg shadow-md border border-blue-800/50 p-6"
    >
      <h2 className="text-xl font-semibold text-gray-200 mb-4">
        Incoming Transactions
      </h2>

      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-400"></div>
          <p className="ml-3 text-gray-300">Loading transactions...</p>
        </div>
      ) : !transactions || transactions.length === 0 ? (
        <p className="text-gray-400 text-center py-4">
          No incoming transactions found for this address.
        </p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-gray-300">
              <thead>
                <tr className="border-b border-blue-800/50">
                  <th className="py-3 px-4 font-semibold text-blue-400">From</th>
                  <th className="py-3 px-4 font-semibold text-blue-400">Amount (ETH)</th>
                  <th className="py-3 px-4 font-semibold text-blue-400">Date</th>
                  <th className="py-3 px-4 font-semibold text-blue-400">Transaction Hash</th>
                </tr>
              </thead>
              <tbody>
                {paginatedTxs.map((tx, index) => {
                  const blockNum = parseInt(tx.blockNum, 16);
                  const timestamp = blockTimes[blockNum];
                  const date = timestamp
                    ? new Date(timestamp * 1000).toLocaleString()
                    : "Loading...";

                  return (
                    <motion.tr
                      key={tx.hash || index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`border-b border-blue-800/50 hover:bg-gray-800/50 transition-colors duration-200 ${
                        index % 2 === 0 ? "bg-gray-900/30" : "bg-gray-900/10"
                      }`}
                    >
                      <TransactionItem
                        tx={tx}
                        ensName={ensMap[tx.from]}
                        date={date}
                      />
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-600 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-gray-400">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-blue-600 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default TransactionList;
