import { Link, useLocation } from 'react-router-dom';


const ShortenAddress = (address) => {
    return address.substring(0, 6) + '...' + address.substring(address.length - 4, address.length);
}

const MyWalletButton = ({
    address,
}) => {
        return (
            <button >
                <Link className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"} to={`/wallet/${address}`}>
                        {ShortenAddress(address)}
                </Link>
            </button>
        );

};

export default MyWalletButton;