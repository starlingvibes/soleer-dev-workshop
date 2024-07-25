import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
} from '@solana/web3.js';
import walletKey from './wallet.json' assert { type: 'json' };
import dotenv from 'dotenv';

dotenv.config();

const to = new PublicKey('tKeYE4wtowRb8yRroZShTipE18YVnqwXjsSAoNsFU6g');
const from = Keypair.fromSecretKey(new Uint8Array(walletKey));

const connection = new Connection(process.env.DEVNET_RPC_URL);

const balance = await connection.getBalance(from.publicKey);
console.log({ balance });

const airdropMyself = async () => {
  const tx = await connection.requestAirdrop(
    from.publicKey,
    LAMPORTS_PER_SOL * 0.3
  );
  const signature = await connection.confirmTransaction(tx);
  return signature;
};

const runTransaction = async () => {
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: from.publicKey,
      toPubkey: to,
      lamports: balance,
    })
  );

  transaction.feePayer = from.publicKey;

  const recentBlockHash = await connection.getLatestBlockhash('confirmed');

  transaction.recentBlockhash = recentBlockHash.blockhash;

  const fee =
    (
      await connection.getFeeForMessage(
        transaction.compileMessage(),
        'confirmed'
      )
    ).value || 0;

  transaction.instructions.pop();

  transaction.add(
    SystemProgram.transfer({
      fromPubkey: from.publicKey,
      toPubkey: to,
      lamports: balance * 0.1 - fee,
    })
  );

  const send = await sendAndConfirmTransaction(connection, transaction, [from]);

  return send;
};
const transfer = async () => {
  if (balance === 0) {
    const signature = await airdropMyself();
    console.log({ signature });
    // console.log('Oga, you no get money!');
  }
  const transaction = await runTransaction();

  console.log({ transaction });
};

transfer();
