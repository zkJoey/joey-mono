// create a component with "check your credit line" button
import { useState } from 'react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

import { BASE_CREDIT_POOL_ADDRESS } from '../contracts/PoolContract';
import { EVALUATION_AGENT_API } from '../lib/config';
// axios
import axios from 'axios';

const CreditLine = ({creditWalletAddress, setCreditStatus}) => {
    const [creditLine, setCreditLine] = useState(0);
    const [isChecking, setIsChecking] = useState(false);
    const [stripeApiKey, setStripeApiKey] = useState('');
    
    const checkCreditLine = async () => {
        setIsChecking(true);
        const body = {
            poolAddress: BASE_CREDIT_POOL_ADDRESS,
            borrowerWalletAddress: creditWalletAddress,
            creditLimit: 1000.0
        }
        // make api request to EVALUATION_AGENT_API/underwrite to get credit line
        const response = await axios.post(`${EVALUATION_AGENT_API}/underwrite`, body);
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
        <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold">Check your credit line</h1>
                <p className="text-gray-500 text-sm">
                You can borrow up to {creditLine} ETH
                </p>
            </div>
            <Input label="Your Stripe Api Key"
                value={stripeApiKey}
                onChange={(e) => setStripeApiKey(e.target.value)}
             />
            <Button type="button" onClick={checkCreditLine} loading={isChecking}>Check</Button>

            </div>
        </div>
        </div>
    );
    }

export default CreditLine;