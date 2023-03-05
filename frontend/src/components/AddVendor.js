import Button from "./ui/Button";
import Container from "./ui/Container";
import Input from "./ui/Input";

import { useState } from "react";
import { Link } from "react-router-dom";

const ShortenAddress = (address) => {
    return address.substring(0, 4) + '...' + address.substring(address.length - 4, address.length);
}


const AddVendor = () => {
  const [vendors, setVendors] = useState([
    { name: "Vendor 1", address: "0xa61464658AfeAf65CccaaFD3a512b69A83B77618" },
    { name: "Vendor 2", address: "0x9fCDf8f60d3009656E50Bf805Cd53C7335b284Fb" },
  ]);
  const [vendorName, setVendorName] = useState("");
  const [vendorAddress, setVendorAddress] = useState("");

  const isValidAddress = (address) => {
    return true;
    if (typeof address !== "string") return false;
    if (!address.match(/^0x[0-9a-fA-F]{40}$/)) return false;
    return true;
  };
  const handleAddVendor = () => {
    // check if address is valid
    if (!isValidAddress(vendorAddress)) {
      alert("Invalid address");
      return;
    }
    setVendors([...vendors, { name: vendorName, address: vendorAddress }]);
    setVendorName("");
    setVendorAddress("");
  };

  return (
    <Container className={"max-w-lg"}>
      <div className="flex flex-col">
        <div className="flex flex-row space-x-2 mb-10">
          <Input
            className="basis-2/7"
            type="text"
            placeholder="Vendor Name"
            value={vendorName}
            onChange={(e) => setVendorName(e.target.value)}
          />
          <Input
            className="basis-2/7"
            type="text"
            placeholder="Vendor Address"
            value={vendorAddress}
            onChange={(e) => setVendorAddress(e.target.value)}
          />
          <Button className="basis-1/7" onClick={handleAddVendor} type="button" variant="primary">
            Add
          </Button>

          <div className="basis-2/7"></div>
        </div>
        {/* List added vendors */}
        <div className="flex flex-col space-y-2">
          {vendors.map((vendor, index) => (
            <div key={index} className="flex flex-row space-x-2">
              <div className="basis-2/5 text-lg font-medium text-gray-700">
                {vendor.name}
              </div>
              <div className="basis-2/5 text-lg font-medium text-gray-700">
                {ShortenAddress(vendor.address)}
              </div>
              <Button className="basis-1/5" type="button" variant="primary">
                <Link to={"/pay/" + vendor.address}>Pay</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default AddVendor;
