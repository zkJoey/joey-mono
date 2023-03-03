import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CreditInfo from '../components/CreditInfo';

import Button from "./ui/Button";
import Container from "./ui/Container";
import Input from "./ui/Input";

import usePoolContract from "../lib/hooks/usePoolContract";

const Pay = ({ creditWalletAddress }) => {
  const [walletAddress , setWalletAddress] = useState("0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199");
  const [amount, setAmount] = useState("");
  console.log("AAA creditWalletAddress", creditWalletAddress);
  const { callDrawdown } = usePoolContract(creditWalletAddress);
  const [isSending, setIsSending] = useState(false);

  const handlePay = async () => {
    setIsSending(true);
    // convert amount to gwei
    const amountInGwei = amount * 10 ** 6;

    await callDrawdown(walletAddress, amountInGwei);
    setIsSending(false);
  }

  return (
    <Container >
      {/* <CreditInfo creditStatus={creditStatus} /> */}
      <Input
        label="Wallet Address"
        value={walletAddress}
        onChange={(e) => setWalletAddress(e.target.value)}
       />
      <Input
        label="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <Button type="button" onClick={handlePay} loading={isSending}>Pay</Button>
    </Container>
  );
};

export default Pay;
