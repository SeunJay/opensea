import { useEffect, useState } from "react";

import { HiTag } from "react-icons/hi";
import { IoMdWallet } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";
import { Listing, NFT } from "../../pages/collections/[CollectionId]";

const style = {
  button: `mr-8 flex items-center py-2 px-12 rounded-lg cursor-pointer`,
  buttonIcon: `text-xl`,
  buttonText: `ml-2 text-lg font-semibold`,
};

const confirmPurchase = (toastHandler = toast) =>
  toastHandler.success(`Purchase successful!`, {
    style: {
      background: "#04111d",
      color: "#fff",
    },
  });

interface PurchaseProps {
  listings: Listing[];
  isListed: string;
  selectedNft: NFT;
  marketPlaceModule: any;
}

const Purchase = ({
  isListed,
  selectedNft,
  listings,
  marketPlaceModule,
}: PurchaseProps) => {
  const [selectedMarketNft, setSelectedMarketNft] = useState({} as NFT);
  const [enableButton, setEnableButton] = useState(false);
  const [lists] = useState(listings);

  useEffect(() => {
    if (!listings || isListed === "false") return;

    (async () => {
      const selectedMarketNft = lists.find(
        (marketNft) => marketNft.asset?.id === selectedNft.id
      );
      setSelectedMarketNft((prevProps) => ({
        ...prevProps,
        selectedMarketNft,
      }));
    })();
  }, [selectedNft, listings, isListed]);

  useEffect(() => {
    if (!selectedMarketNft || !selectedNft) return;

    setEnableButton(true);
  }, [selectedMarketNft, selectedNft]);

  // console.log(selectedMarketNft);

  const buyItem = async (
    listingId = selectedNft.id,
    quantityDesired = 1,
    module = marketPlaceModule
  ) => {
    console.log(listingId, quantityDesired, module, "david");

    console.log("module ", module);

    try {
      // await module.buyoutDirectListing({
      //   listingId: listingId,
      //   quantityDesired: quantityDesired,
      // });

      confirmPurchase();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex h-20 w-full items-center rounded-lg border border-[#151c22] bg-[#303339] px-12">
      <Toaster position="bottom-left" reverseOrder={false} />
      {isListed === "true" ? (
        <>
          <div
            onClick={() => {
              enableButton ? buyItem(selectedMarketNft.id, 1) : null;
            }}
            className={`${style.button} bg-[#2081e2] hover:bg-[#42a0ff]`}
          >
            <IoMdWallet className={style.buttonIcon} />
            <div className={style.buttonText}>Buy Now</div>
          </div>
          <div
            className={`${style.button} border border-[#151c22]  bg-[#363840] hover:bg-[#4c505c]`}
          >
            <HiTag className={style.buttonIcon} />
            <div className={style.buttonText}>Make Offer</div>
          </div>
        </>
      ) : (
        <div className={`${style.button} bg-[#2081e2] hover:bg-[#42a0ff]`}>
          <IoMdWallet className={style.buttonIcon} />
          <div className={style.buttonText}>List Item</div>
        </div>
      )}
    </div>
  );
};

export default Purchase;
