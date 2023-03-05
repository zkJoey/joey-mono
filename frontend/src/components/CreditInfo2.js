import { useEffect, useState } from "react";
import usePoolContract from "../lib/hooks/usePoolContract";
import React from "react";


const MockCreditInfo = ({creditStatus}) => {
  return (
    <div className="flex flex-col gap-4">
    <div className="grid grid-cols-4 gap-4">
      <div className="text-center">
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
          Circle Balance
        </p>
        <p className="mt-2 text-lg font-bold text-gray-900 font-mono">$15,123</p>
      </div>
      <div className="text-center">
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
          Stripe Revenue
        </p>
        <p className="mt-2 text-lg font-bold text-gray-900 font-mono">N/A</p>
      </div>
      <div className="text-center">
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
          Spectral Score
        </p>
        <p className="mt-2 text-lg font-bold text-gray-900 font-mono">555</p>
      </div>
      <div className="text-center">
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
          Interest Rate
        </p>
        <p className="mt-2 text-lg font-bold text-gray-900 font-mono">9.43%</p>
      </div>
      </div>
      <div className="grid grid-cols-1 gap-1">
      <div className="text-center">
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
          Credit Limit
        </p>
        <p className="mt-2 text-lg font-bold text-gray-900 font-mono">$2489.5</p>
      </div>

      </div>
      </div>
    
  );
};



// const CreditInfo = ({ creditWalletAddress }) => {
//   const { getCreditRecordMapping } = usePoolContract(creditWalletAddress);
//   const [creditStatus, setCreditStatus] = useState({});
//   useEffect(() => {
//     const getCreditStatus = async () => {
//       const creditStatus = await getCreditRecordMapping();
//       console.log("Incoming creditStatus", creditStatus);
//       const creditStatus2 = {
//         correction: creditStatus['correction'],
//         dueDate: creditStatus['dueDate'],
//         feesAndInterestDue: creditStatus['feesAndInterestDue'],
//         interestRate: creditStatus['interestRate'],
//         missedPeriods: creditStatus['missedPeriods'],
//         remainingPeriods: creditStatus['remainingPeriods'],
//         state: creditStatus['state'],
//         totalDue: creditStatus['totalDue'],
//         unbilledPrincipal: creditStatus['unbilledPrincipal'],
//       }
//       // iterate over values and if it is bignumber, convert to number
//       for (const [key, value] of Object.entries(creditStatus2)) {
//         console.log(`${key}: ${value}`);
//         console.log("typeof value", typeof value);
//         if(typeof value === "object") {
//           console.log("value.toString()", value.toString());
//           creditStatus2[key] = Number(value)
//         }

//       }
//       console.log("creditStatus", creditStatus2);
//       setCreditStatus(creditStatus2);
//     };
//     getCreditStatus();
//   }, []);
//   // creditStatus ={
//   //     "creditLimit": 300000000,
//   //     "intervalInDays": 30,
//   //     "remainingPeriods": 12,
//   //     "aprInBps": 0
//   // }
//   return (
//     <div className="container mx-auto">
//       <div className="flex flex-col items-center justify-center">
//         <div className="flex flex-col items-center justify-center">
//           <h1 className="text-2xl font-bold">Your credit line</h1>
//           <ExampleComponent creditStatus={creditStatus} />
//         </div>
//       </div>
//     </div>
//   );
// };

export default MockCreditInfo;