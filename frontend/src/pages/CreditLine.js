// create a component with "check your credit line" button
import { useState } from 'react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
const CreditLine = () => {
    const [creditLine, setCreditLine] = useState(0);
    const [isChecking, setIsChecking] = useState(false);
    const [stripeApiKey, setStripeApiKey] = useState('');
    
    const checkCreditLine = async () => {
        setIsChecking(true);
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