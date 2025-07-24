import React, { useEffect, useState } from "react";
import { JsonRpcProvider } from "ethers";

const provider = new JsonRpcProvider(import.meta.env.VITE_RPC_URL);

const ENSAvatar = ({ ensName }) => {
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    const fetchAvatar = async () => {
      if (ensName) {
        try {
          const resolver = await provider.getResolver(ensName);
          const url = await resolver.getAvatar();
          setAvatar(url);
        } catch {
          setAvatar("");
        }
      }
    };
    fetchAvatar();
  }, [ensName]);

  return avatar ? (
    <img src={avatar} alt={ensName} className="w-8 h-8 rounded-full" />
  ) : null;
};

export default ENSAvatar;
