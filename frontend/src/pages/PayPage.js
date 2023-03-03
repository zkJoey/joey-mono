import Pay from "../components/Pay";

const PayPage = ({ creditWalletAddress }) => {
    if(creditWalletAddress == null){
        console.log("Loading ", creditWalletAddress);
        return <div>Loading</div>;
    }
  return <>{creditWalletAddress && <Pay creditWalletAddress={creditWalletAddress} />}</>;
};

export default PayPage;
