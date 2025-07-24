import { useEffect, useState } from "react";
import { Alchemy, Network } from "alchemy-sdk";

// Alchemy config
const config = {
  apiKey: import.meta.env.VITE_ALCHEMY_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(config);

export const useFetchTransactions = (address) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTx = async () => {
      if (!address) return;
      setLoading(true);
      try {
        const history = await alchemy.core.getAssetTransfers({
          fromBlock: "0x0",
          toAddress: address,
          category: ["external", "erc20", "erc721", "erc1155"],
          order: "desc",
          maxCount: 100,
        });
        setTransactions(history.transfers || []);
      } catch (err) {
        console.error("Error fetching transactions:", err);
        setTransactions([]);
      }
      setLoading(false);
    };
    fetchTx();
  }, [address]);

  return { transactions, loading };
};
