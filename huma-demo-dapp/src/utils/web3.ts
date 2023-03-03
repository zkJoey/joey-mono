import { Contract } from '@ethersproject/contracts'
import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers'
import { AddressZero } from '@ethersproject/constants'
import { getAddress } from '@ethersproject/address'

// returns the checksummed address if the address is valid, otherwise returns false
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isAddress(value: any): string | false {
  try {
    // Alphabetical letters must be made lowercase for getAddress to work.
    // See documentation here: https://docs.ethers.io/v5/api/utils/address/
    return getAddress(value.toLowerCase())
  } catch {
    return false
  }
}

// account is not optional
function getSigner(provider: JsonRpcProvider, account: string): JsonRpcSigner {
  return provider.getSigner(account).connectUnchecked()
}

// account is optional
function getProviderOrSigner(
  provider: JsonRpcProvider,
  account?: string,
): JsonRpcProvider | JsonRpcSigner {
  return account ? getSigner(provider, account) : provider
}

// account is optional
export function getContract(
  address: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ABI: any,
  provider: JsonRpcProvider,
  account?: string,
): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }

  return new Contract(
    address,
    ABI,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getProviderOrSigner(provider, account) as any,
  )
}
