// create a component with "check your credit line" button
import { useState } from 'react';
const CreditLine = () => {
    const [creditLine, setCreditLine] = useState(0);
    const [isChecking, setIsChecking] = useState(false);
    
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
            <div className="flex flex-col items-center justify-center">
                <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={checkCreditLine}
                disabled={isChecking}
                >
                {isChecking ? 'Checking...' : 'Check'}
                </button>
            </div>
            </div>
        </div>
        </div>
    );
    }

export default CreditLine;