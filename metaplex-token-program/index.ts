import {
  createV1,
  TokenStandard,
} from '@metaplex-foundation/mpl-token-metadata';
import { generateSigner, percentAmount } from '@metaplex-foundation/umi';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';

const umi = createUmi('https://api.devnet.solana.com');

const mint = generateSigner(umi);

const secretArray = [
  170, 46, 135, 214, 254, 91, 57, 110, 203, 173, 146, 159, 134, 235, 35, 58,
  221, 182, 247, 251, 16, 183, 44, 237, 14, 100, 14, 63, 23, 196, 68, 163, 86,
  33, 206, 154, 196, 213, 251, 92, 42, 154, 193, 177, 7, 31, 32, 92, 92, 75,
  231, 233, 40, 240, 62, 222, 127, 251, 105, 112, 75, 4, 163, 191,
];

const secret = Uint8Array.from(secretArray);
const keypair = umi.eddsa.createKeypairFromSecretKey(secret);

const authority = generateSigner(umi);

const sig = createV1(umi, {
  mint,
  authority: umi.identity,
  name: 'Starling Metaplex Token',
  symbol: 'STARLINGMT',
  uri: 'https://usetaliot.com',
  sellerFeeBasisPoints: percentAmount(0),
  tokenStandard: TokenStandard.FungibleAsset,
});

console.log({ mint: mint.publicKey });
console.log({ sig });
