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
    <Container>
      <h1 className="text-2xl font-bold">My Accounts Receivables</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', width: '200%' }}>
        <div style={{ width: 'calc(33.33% - 10px)', marginBottom: '20px' }}>
          <img src="https://i.ibb.co/Kj4RryQ/invoice.png" alt="Placeholder 1" style={{ width: '100%', height: 'auto' }} />
        </div>
        <div style={{ width: 'calc(33.33% - 10px)', marginBottom: '20px' }}>
          <img src="https://i.ibb.co/9wy5nN6/Group-1-1.png" alt="Placeholder 2" style={{ width: '100%', height: 'auto' }} />
         
        </div>
        <div style={{ width: 'calc(33.33% - 10px)', marginBottom: '20px' }}>
          <img src="https://i.ibb.co/Kj4RryQ/invoice.png" alt="Placeholder 3" style={{ width: '100%', height: 'auto' }} />
          
        </div>
      </div>
    </Container>
  );
};

export default CollateralPage;



 