import Pay from "../components/Pay";

//useParams
import { useParams } from "react-router-dom";
import DummyGreeter from "./DummyGreeter";
const PayPage = ({ creditWalletAddress, setState, state }) => {
  let { vendorAddress } = useParams();
  if (creditWalletAddress == null) {
    console.log("Loading ", creditWalletAddress);
    return <div>Loading</div>;
  }
  return creditWalletAddress&&(
    <>
      {/* <DummyGreeter creditWalletAddress={creditWalletAddress} /> */}
      <Pay
        vendorAddress={vendorAddress}
        creditWalletAddress={creditWalletAddress}
        setState={setState}
        state={state}
      />
    </>
  );
};

export default PayPage;
