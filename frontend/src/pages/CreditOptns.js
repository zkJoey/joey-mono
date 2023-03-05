// create a component with "check your credit line" button
import { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Container from "../components/ui/Container";

import { BASE_CREDIT_POOL_ADDRESS } from "../contracts/PoolContract";
import { EVALUATION_AGENT_API } from "../lib/config";
// axios
import axios from "axios";
import ModalOpener from "../components/ModalOpener";

const CreditOptns = () => {


  const [isCollateral, setCollateral] = useState(true);
  const location = useLocation();

  const handleButtonClick = (isCollateral) => {
    setCollateral(isCollateral);

  }


  return (
    <Container>
      <h1 className="text-2xl font-bold">Credit Options</h1>
      <div class="flex-parent jc-center">
          
          <Link 
            to={{
            pathname: "/collateral",
            state: {isCollateral}
            }}>
          <Button type="button" size="lg" 
          className="bg-violet-700 hover:bg-violet-800" 
          style={{ marginRight: '10px', flex: 1 }} 
          onClick={() => handleButtonClick(true)}
          >
            Collateral
          </Button>
          </Link>

          <Link>
          <Button type="button" size="lg" 
          className="bg-blue-600 hover:bg-blue-700" 
          style={{flex: 1}}
          onClick={() => handleButtonClick(false)}>
            No Collateral
          </Button>
          </Link>
      </div>
    </Container>
  
  );
};

export default CreditOptns;
