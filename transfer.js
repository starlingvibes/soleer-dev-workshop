import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import walletKey from './wallet.json' assert { type: 'json' };

const to = new PublicKey('tKeYE4wtowRb8yRroZShTipE18YVnqwXjsSAoNsFU6g');
const from = Keypair.fromSecretKey(new Uint8Array(walletKey));

const connection = new Connection(process.env.DEVNET_RPC_URL);

const transfer = async () => {
  const balance = connection.getBalance(from.publicKey);
  console.log(balance);
};

console.log(to, from);
