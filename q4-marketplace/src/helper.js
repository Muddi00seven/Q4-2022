export const getNfts = async (Moralis, address, set) => {
  try {
    const options = {
      chain: "rinkeby",
      address: address,
      token_address: "0x34cd8Db6f964775a4946611a51b56167B2Ab5176",
    };
    const nfts = await Moralis.Web3API.account.getNFTsForContract(options);
    set(nfts?.result);
  } catch (error) {
    console.log("error", error);
  }
};
