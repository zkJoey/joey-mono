import Pay from "../components/Pay";

//useParams
import { useParams } from "react-router-dom";
import DummyGreeter from "./DummyGreeter";
const PayPage = ({ creditWalletAddress }) => {
  let { vendorAddress } = useParams();
  if (creditWalletAddress == null) {
    console.log("Loading ", creditWalletAddress);
    return <div>Loading</div>;
  }
  return (
    <>
      <DummyGreeter creditWalletAddress={creditWalletAddress} />{" "}
      <Pay
        vendorAddress={vendorAddress}
        creditWalletAddress={creditWalletAddress}
      />
    </>
  );
};

export default PayPage;
