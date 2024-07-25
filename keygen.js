import { Keypair } from '@solana/web3.js';

export const generateKey = () => {
  const wallet = Keypair.generate();
  const publicKey = wallet.publicKey.toBase58();
  const privateKey = wallet.secretKey;
  return { publicKey, privateKey };
};
