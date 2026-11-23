import { Wallet, getTokenMetadata, getEncodedToken } from '@cashu/cashu-ts';

export const mint = 'https://testnut.cashu.space';
export const amount = 21;

export function readReward(value) {
  try {
    const decoded = getTokenMetadata(value);
    return decoded.mint === mint && decoded.unit === 'sat' && decoded.amount.toBigInt() === BigInt(amount) ? value : '';
  } catch {
    return '';
  }
}

export async function issueReward() {
  const wallet = new Wallet(mint);
  await wallet.loadMint();
  let quote = await wallet.createMintQuoteBolt11(amount);
  // Testnut simulates the Lightning payment. Never pay this invoice.
  for (let attempt = 0; quote.state === 'UNPAID' && attempt < 8; attempt += 1) {
    await new Promise((resolve) => setTimeout(resolve, 850));
    quote = await wallet.checkMintQuoteBolt11(quote.quote);
  }
  if (quote.state !== 'PAID') throw new Error('Test mint did not mark the quote paid');
  const proofs = await wallet.mintProofsBolt11(amount, quote);
  const token = getEncodedToken({ mint, proofs, unit: 'sat' });
  if (!readReward(token)) throw new Error('Invalid test reward token');
  return token;
}
