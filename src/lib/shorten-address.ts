import { type Address } from 'viem';

export const shortenAddress = (address: Address, fromStart = 4, fromEnd = 4) =>
  address.slice(0, fromStart + 2) +
  '...' +
  address.slice(address.length - fromEnd, address.length);
