import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useWeb3 } from "@3rdweb/hooks";
import { ThirdwebSDK } from "@3rdweb/sdk";

import Header from "../../components/Header";

const style = {
  wrapper: `flex flex-col items-center container-lg text-[#e5e8eb]`,
  container: `container p-6`,
  topContent: `flex`,
  nftImgContainer: `flex-1 mr-4`,
  detailsContainer: `flex-[2] ml-4`,
};

const Nft = () => {
  const router = useRouter();
  const { provider } = useWeb3();
  const [selectedNFT, setSelectedNFT] = useState({});
  const [listings, setListings] = useState();

  const NFTModule = useMemo(() => {
    if (!provider) return;

    const sdk = new ThirdwebSDK(
      provider.getSigner(),
      "https://eth-goerli.g.alchemy.com/v2/iSWp-fXs_yuGC3lyL8TYMC60YWW226EL"
    );

    return sdk.getNFTModule("0x79c386C391a35950Fef6f6083eef36b5709b55be");
  }, [provider]);

  // get all NFTs in the collection
  useEffect(() => {
    if (!NFTModule) return;

    (async () => {
      const nfts = await NFTModule.getAll();

      const selectedNFT = nfts.find((nft) => nft.id === router.query.Nft);

      setSelectedNFT(selectedNFT);
    })();
  }, [NFTModule]);

  const marketplaceModule = useMemo(() => {
    if (!provider) return;

    const sdk = new ThirdwebSDK(
      provider.getSigner(),
      "https://eth-goerli.g.alchemy.com/v2/iSWp-fXs_yuGC3lyL8TYMC60YWW226EL"
    );

    return sdk.getMarketplaceModule(
      "0x797b5a6388849743dc7ec4E43923bd99EEeBCD04"
    );
  }, [provider]);

  // get all listings in the collection
  useEffect(() => {
    if (!marketplaceModule) return;

    (async () => {
      const listings = await marketplaceModule.getAllListings();
      setListings(listings);
    })();
  }, [marketplaceModule]);

  return (
    <div>
      <Header />
      <h2>{router.query.Nft}</h2>
    </div>
  );
};

export default Nft;
