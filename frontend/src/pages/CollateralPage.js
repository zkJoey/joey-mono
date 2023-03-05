// create a component with "check your credit line" button
import { useState } from "react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Container from "../components/ui/Container";
import CreditInfo from "../components/CreditInfo";

import { BASE_CREDIT_POOL_ADDRESS } from "../contracts/PoolContract";
import { EVALUATION_AGENT_API } from "../lib/config";
// axios
import axios from "axios";
import ModalOpener from "../components/ModalOpener";
import MockCreditInfo from "../components/CreditInfo2";

const CollateralPage = ({ isCollateral }) => {
  const [creditLine, setCreditLine] = useState(0);
  const [isChecking, setIsChecking] = useState(false);
  const [stripeApiKey, setStripeApiKey] = useState("");
  const [circleApiKey, setCircleApiKey] = useState("");

  const checkCreditLine = async () => {
    setIsChecking(true);
    
    // setCreditOption(response.data);

    const creditLine = 10;
    setCreditLine(creditLine);
    setIsChecking(false);
  };
  return (
    <div className="items-center justify-center pt-32">
      
    <div className="flex flex-col items-center justify-center text-center gap-y-4">

    <h1 className="text-2xl font-bold">My Accounts Receivables</h1>

      <div className="flex flex-row space-x-5 mb-10">
      <img className="max-h-64" src="https://i.ibb.co/Kj4RryQ/invoice.png" alt="Placeholder 1"/>
      <img className="max-h-64" src="https://i.ibb.co/9wy5nN6/Group-1-1.png" alt="Placeholder 1"/>
      <img className="max-h-64" src="https://i.ibb.co/Kj4RryQ/invoice.png" alt="Placeholder 1"/>
      </div>

      <MockCreditInfo />

      <Button variant="primary" onClick={checkCreditLine} isLoading={isChecking}>Borrow</Button>

    </div>
    </div>
  )
  return (
    <Container>
      <div className="flex flex-col">
      <h1 className="text-2xl font-bold">My Accounts Receivables</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', width: '200%' }}>
        <div style={{ width: 'calc(33.33% - 10px)', marginBottom: '20px' }}>
          <img src="https://i.ibb.co/Kj4RryQ/invoice.png" alt="Placeholder 1" style={{ width: '100%', height: 'auto' }} />
        </div>
        <div style={{ width: 'calc(33.33% - 10px)', marginBottom: '20px' }}>
          <img src="https://i.ibb.co/Kj4RryQ/invoice.png" alt="Placeholder 2" style={{ width: '100%', height: 'auto' }} />
         
        </div>
        <div style={{ width: 'calc(33.33% - 10px)', marginBottom: '20px' }}>
          <img src="https://i.ibb.co/Kj4RryQ/invoice.png" alt="Placeholder 3" style={{ width: '100%', height: 'auto' }} />
          
        </div>
      </div>

      <CreditInfo />
      </div>

   
    </Container>
  );
};

export default CollateralPage;



 