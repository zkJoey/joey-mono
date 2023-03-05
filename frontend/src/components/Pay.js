import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CreditInfo from '../components/CreditInfo';

import Button from "./ui/Button";
import Container from "./ui/Container";
import Input from "./ui/Input";

import usePoolContract from "../lib/hooks/usePoolContract";

// import useNavigate
import { useNavigate } from 'react-router-dom';

import MockCreditInfo from "../components/CreditInfo2";

const Pay = ({ creditWalletAddress, vendorAddress, setState, state }) => {
  const [walletAddress , setWalletAddress] = useState(vendorAddress? vendorAddress : "");
  const [amount, setAmount] = useState("");
  console.log("AAA creditWalletAddress", creditWalletAddress);
  const { callDrawdown } = usePoolContract(creditWalletAddress);
  const [isSending, setIsSending] = useState(false);

  const navigate = useNavigate();
  const handlePay = async () => {
    // alert("Sending " + amount + " to " + walletAddress)
    setState(1);
    navigate('/multisig');
    setIsSending(true);
    // convert amount to gwei
    const amountInGwei = amount * 10 ** 6;

    await callDrawdown(walletAddress, amountInGwei);
    setIsSending(false);
  }

  return (
    <>
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
      <Button type="button" variant='primary' onClick={handlePay} loading={isSending}>Pay</Button>
    </Container>
    </>
  );
};

export default Pay;
