import Pay from "../components/Pay";

//useParams
import { useParams } from "react-router-dom";
const PayPage = ({ creditWalletAddress }) => {
  let { vendorAddress } = useParams();
    if(creditWalletAddress == null){
        console.log("Loading ", creditWalletAddress);
        return <div>Loading</div>;
    }
  return <>{creditWalletAddress && <Pay vendorAddress={vendorAddress} creditWalletAddress={creditWalletAddress} />}</>;
};

export default PayPage;
