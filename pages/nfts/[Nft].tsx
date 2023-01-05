import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useWeb3 } from "@3rdweb/hooks";
import { ThirdwebSDK } from "@3rdweb/sdk";

import Header from "../../components/Header";
import NFTImage from "../../components/nft/NFTImage";
import { Listing, NFT } from "../collections/[CollectionId]";
import GeneralDetails from "../../components/nft/GeneralDetails";
import ItemActivity from "../../components/nft/ItemActivity";
import Purchase from "../../components/nft/Purchase";

const style = {
  wrapper: `flex flex-col items-center container-lg text-[#e5e8eb]`,
  container: `container p-6`,
  topContent: `flex`,
  nftImgContainer: `flex-2 mr-4`,
  detailsContainer: `flex-[2] ml-4`,
};

const Nft = () => {
  const router = useRouter();
  const { provider } = useWeb3();
  const [selectedNFT, setSelectedNFT] = useState({} as NFT);
  const [listings, setListings] = useState<Listing[]>([]);

  const isListed = router.query.isListed as string;

  const NFTModule = useMemo(() => {
    if (!provider) return;

    const sdk = new ThirdwebSDK(
      provider.getSigner(),
      "https://eth-goerli.g.alchemy.com/v2/iSWp-fXs_yuGC3lyL8TYMC60YWW226EL"
    );

    return sdk.getNFTModule("0x61ddDBa0bd02d5f6C6B54f11Cfd68e9750408840");
  }, [provider]);

  // get all NFTs in the collection
  useEffect(() => {
    if (!NFTModule) return;

    (async () => {
      const nfts = await NFTModule.getAll();

      const selectedNFT = nfts.find(
        (nft) => nft.id === router.query.Nft
      ) as NFT;

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
      "0x05a92932E2d92A9aFfe2b316EC461f752171c152"
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
      <div className={style.wrapper}>
        <div className={style.container}>
          <div className={style.topContent}>
            <div className={style.nftImgContainer}>
              <NFTImage selectedNFT={selectedNFT} />
            </div>

            <div className={style.detailsContainer}>
              <GeneralDetails selectedNFT={selectedNFT} />
              <Purchase
                isListed={isListed}
                selectedNft={selectedNFT}
                listings={listings}
                marketPlaceModule={marketplaceModule}
              />
            </div>
          </div>
          <ItemActivity />
        </div>
      </div>
    </div>
  );
};

export default Nft;
