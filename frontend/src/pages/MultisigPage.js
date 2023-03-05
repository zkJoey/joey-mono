import { useAccount } from "wagmi";
import Button from "../components/ui/Button";
import Container from "../components/ui/Container";
import MockCreditInfo from "../components/CreditInfo2";

export const getWalletAddressAbbr = (address) => {
  if (!address) {
    return address;
  }
  const { length } = address;
  return `${address.slice(0, 6)}...${address.slice(length - 4, length)}`;
};

const MultisigPage = (state) => {
  // get the acount addres
  const { address, isConnected } = useAccount();

  return (
    <div className="items-center justify-center">
      <div className="flex flex-col min-h-screen items-center justify-center text-center gap-y-4 mx-auto">
        <h1 className="text-2xl font-bold">Your Borrow</h1>
        <p className="font-mono">TX ID: 0xb94005a0e046db9f21f0ba984361c1a55d81136fb6e9a3c0eb31385b255da750</p>
        <div className="flex flex-col rounded overflow-hidden shadow-lg py-4 px-8 w-9/12 border">
          <h2 className="text-xl font-bold mb-2">Wallet Confirmations</h2>


          <div className="grid grid-cols-5 gap-4 rounded overflow-hidden border mb-2 py-4 px-8">
            <div className="flex flex-row">
              <img
                className=" max-h-8"
                src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                alt="Placeholder 1"
              />
              <div className=" text-lg font-medium text-gray-700">
                You(
                {getWalletAddressAbbr(address)}
                )
              </div>
            </div>
            <div className="col-span-3"></div>
            <div className="col-span-1 text-lg font-medium text-gray-700">
            Confirmed ✅
            </div>
          </div>

          <div className="grid grid-cols-5 gap-4 rounded overflow-hidden border  py-4 px-8">
            <div className="flex flex-row">
              <img
                className=" max-h-8"
                src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                alt="Placeholder 1"
              />
              <div className=" text-lg font-medium text-gray-700">
                Guarantor(
                {getWalletAddressAbbr(
                  "0xf3c8cc45aea1d4ca29074eec3db865b8df99d0c214345641643280c72119de4d"
                )}
                )
                <div className="text-sm">Guaranteed amount $2530.12</div>
              </div>
            </div>
            <div className="col-span-3"></div>
            <div className="col-span-1 text-lg font-medium text-gray-700">
            Confirmed ✅
            </div>
          </div>
        </div>
      <MockCreditInfo state={state} />
      </div>
    </div>
  );
};

export default MultisigPage;
