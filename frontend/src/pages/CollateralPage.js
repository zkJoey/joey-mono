// create a component with "check your credit line" button
import { useState } from "react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Container from "../components/ui/Container";

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
    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
    <div style={{ width: 'calc(33.33% - 10px)', marginBottom: '20px' }}>
        <img src="https://via.placeholder.com/300x200" alt="Placeholder 1" style={{ width: '100%', height: 'auto' }} />
    </div>
    <div style={{ width: 'calc(33.33% - 10px)', marginBottom: '20px' }}>
        <img src="https://via.placeholder.com/300x200" alt="Placeholder 2" style={{ width: '100%', height: 'auto' }} />
    </div>
    <div style={{ width: 'calc(33.33% - 10px)', marginBottom: '20px' }}>
        <img src="https://via.placeholder.com/300x200" alt="Placeholder 3" style={{ width: '100%', height: 'auto' }} />
    </div>
    </div>
    <h2 className="text-lg font-bold" style={{ marginTop: '20px' }}>Welcome to My Accounts Receivables</h2>
    <p className="text-md" style={{ marginTop: '10px' }}>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer blandit justo id massa rhoncus,
    et ultricies nisl vestibulum. Nulla facilisi. Maecenas mollis velit velit, ac pellentesque urna
    eleifend vel.
    </p>
    </Container>
  
  );
};

export default CollateralPage;



 