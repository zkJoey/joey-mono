import { Link, useLocation } from 'react-router-dom';
import SvgIcon from './ui/SvgIcon';


const ShortenAddress = (address) => {
    return address.substring(0, 4) + '...' + address.substring(address.length - 4, address.length);
}

const MyWalletButton = ({
    address,
}) => {
        return (
            <button >
                <Link className={"flex flex-row bg-[#3496ff] hover:bg-[#2f87e5] text-white py-2.5 px-4 rounded-[10px] border border-[#2a79cd] overflow-auto"} to={`/credit-info`}>
                    <SvgIcon icon="wallet" className="w-4 h-4 mr-2 color-white fill-white" />
                        {ShortenAddress(address)}
                </Link>
            </button>
        );

};

export default MyWalletButton;