import CreditInfo from "../components/CreditInfo";

const CreditInfoPage = ({ creditWalletAddress }) => {
  console.log("AAA creditWalletAddress", creditWalletAddress);
  if(!creditWalletAddress)
    return <div>Loading...</div>
  return (
    <>
      <CreditInfo creditWalletAddress={creditWalletAddress} />
    </>
  );
};

export default CreditInfoPage;
