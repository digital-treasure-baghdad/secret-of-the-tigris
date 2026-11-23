import assert from 'node:assert/strict';
import { Wallet, getTokenMetadata } from '@cashu/cashu-ts';
import { mint, issueReward, readReward } from './cashu.js';

const token = await issueReward();
assert.equal(readReward(token), token);
const receivingWallet = new Wallet(mint);
await receivingWallet.loadMint();
const proofs = await receivingWallet.receive(token);
const total = proofs.reduce((sum, proof) => sum + proof.amount.toBigInt(), 0n);
assert(total > 0n && total <= 21n);
assert.equal(getTokenMetadata(token).mint, mint);
console.log(`Issued 21 Testnut sat and redeemed ${total} Testnut sat after mint fees.`);
