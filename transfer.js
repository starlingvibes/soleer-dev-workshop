import {
  Connection,
  Keypair,
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

const transfer = async () => {
  const balance = await connection.getBalance(from.publicKey);
  console.log({ balance });

  if (balance === 0) {
    console.log('Oga, you no get money!');
  } else {
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

    const send = await sendAndConfirmTransaction(connection, transaction, [
      from,
    ]);

    console.log({ send });
  }
};

transfer();
