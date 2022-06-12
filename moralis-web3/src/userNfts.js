import React, { useState } from "react";

export const UserNfts = async ({ Moralis, address }) => {
  try {
    const options = {
      chain: "rinkeby",
      address: address,
    };
    const nfts = await Moralis.Web3.getNFTs(options);
    console.log("nfts", nfts);
  } catch (error) {
    console.log("error", error);
  }
};
