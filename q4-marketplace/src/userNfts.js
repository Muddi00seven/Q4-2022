import React, { useState } from "react";
import { getNfts } from "./helper";
import { ListCard } from "./listingCard";

export const UserNfts = ({ Moralis, address, marketplaceContract }) => {
  const [nfts, setNfts] = useState();
  const handleNfts = async () => {
    try {
      await getNfts(Moralis, address, setNfts);
    } catch (error) {
      console.log("error", error);
    }
  };
  const openTrade = async (tokenId, price) => {
    try {
      const receipt = await marketplaceContract?.methods
        .openTrade(tokenId, price)
        .send({ from: address });
      console.log("receipt", receipt);
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <>
      <button onClick={() => handleNfts()}>User Nfts</button>
      <br />
      <div class="row">
        {nfts?.map((item) => (
          <>
            <ListCard data={item} action={openTrade}/>
          </>
        ))}
      </div>
    </>
  );
};
