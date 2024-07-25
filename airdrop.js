import { Connection, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import dotenv from 'dotenv';
dotenv.config();

(async () => {
  const connection = new Connection(process.env.DEVNET_RPC_URL);
  //   const { publicKey, privateKey } = generateKey();
  const publicKey = process.env.PUBLIC_KEY;
  const privateKey = process.env.PRIVATE_KEY;
  console.log(publicKey);
  console.log(privateKey);
  const myAddress = new PublicKey(publicKey);
  const tx = await connection.requestAirdrop(myAddress, LAMPORTS_PER_SOL * 0.1);
  const signature = await connection.confirmTransaction(tx);
  console.log(signature);
})();
