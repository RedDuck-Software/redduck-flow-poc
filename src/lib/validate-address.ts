import { type Address, isAddress } from 'viem';

export const validateAddress = (address?: string): address is Address =>
  !!address && isAddress(address);
