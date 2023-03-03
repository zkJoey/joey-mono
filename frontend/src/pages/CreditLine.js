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

const CreditLine = ({ creditWalletAddress, setCreditStatus }) => {
  const [creditLine, setCreditLine] = useState(0);
  const [isChecking, setIsChecking] = useState(false);
  const [stripeApiKey, setStripeApiKey] = useState("");
  const [circleApiKey, setCircleApiKey] = useState("");

  const checkCreditLine = async () => {
    setIsChecking(true);
    const body = {
      poolAddress: BASE_CREDIT_POOL_ADDRESS,
      borrowerWalletAddress: creditWalletAddress,
      creditLimit: 1000.0,
    };
    // make api request to EVALUATION_AGENT_API/underwrite to get credit line
    const response = await axios.post(
      `${EVALUATION_AGENT_API}/underwrite`,
      body
    );
    console.log("response", response.data);
    setCreditStatus(response.data);
    // {
    //     "creditLimit": 300000000,
    //     "intervalInDays": 30,
    //     "remainingPeriods": 12,
    //     "aprInBps": 0
    // }

    // const creditLine = await ethereumClient.getAvailableCreditLine();
    const creditLine = 10;
    setCreditLine(creditLine);
    setIsChecking(false);
  };

  return (
    <Container>
      <h1 className="text-2xl font-bold">Check your credit line</h1>

      <ModalOpener
        button={
          <Button type="button" className="bg-[#635aff] hover:bg-[#4c4cdc]">
            Connect Stripe
          </Button>
        }
        modal={
          <div>
            <Input
              label="Your Stripe Api Key"
              value={stripeApiKey}
              onChange={(e) => setStripeApiKey(e.target.value)}
            />
          </div>
        }
      />

      <ModalOpener
        button={
          <Button type="button" className="bg-[#2276cb] hover:bg-[#2376cb]">
            Connect Circle
          </Button>
        }
        modal={
          <div>
            <Input
              label="Your Circle Api Key"
              value={circleApiKey}
              onChange={(e) => setCircleApiKey(e.target.value)}
            />
          </div>
        }
      />

      <Button type="button" variant="primary" onClick={checkCreditLine} loading={isChecking}>
        Check
      </Button>
    </Container>
  );
};

export default CreditLine;
