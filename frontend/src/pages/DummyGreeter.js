import useGreeterContract from "../lib/hooks/useGreeterContract";
import { useEffect, useState } from "react";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";

const DummyGreeter = ({creditWalletAddress}) => {
  const [greeting, setGreeting] = useState("");
  const { getGreeting, changeGreeting } = useGreeterContract(creditWalletAddress);

  const handleChangeGreeting = async () => {
    await changeGreeting(creditWalletAddress);
  }


  useEffect(() => {
    const handleGetGreeting = async () => {
      const greeting = await getGreeting();
      // alert("greeting: " + greeting);
      setGreeting(greeting);
    };
    handleGetGreeting();
  }, []);
  return (
    <Container>
      <div className="flex flex-col min-h-screen items-center justify-center text-center gap-y-4 max-w-md mx-auto">
      <div>Hello :{greeting}</div>
      <Button onClick={async () => setGreeting(await getGreeting())}>Set Greeting</Button>


      <Button onClick={handleChangeGreeting}>Change Greeting</Button>
      </div>
    </Container>
  );
};

export default DummyGreeter;
