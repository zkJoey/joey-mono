import { useEffect } from "react";
import usePoolContract from "../lib/hooks/usePoolContract";

const CreditInfo = ({ creditStatus }) => {
  const { getCreditRecordMapping } = usePoolContract();
  useEffect(() => {
    // console.log("AA creditStatus", creditStatus);
  }, []);
  // creditStatus ={
  //     "creditLimit": 300000000,
  //     "intervalInDays": 30,
  //     "remainingPeriods": 12,
  //     "aprInBps": 0
  // }
  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold">Your credit line</h1>
          <p className="text-gray-500 text-sm">
            You can borroww up to {creditStatus.creditLimit} ETH
            adfsg {getCreditRecordMapping()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreditInfo;
