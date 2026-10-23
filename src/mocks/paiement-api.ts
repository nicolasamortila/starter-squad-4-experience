import { getOfferById } from './offre-api.js';

/** Requête et réponse de POST /v1/late-checkout/payments, d'après teams/squad-3-paiement/contracts/paiement-api.md v0.1.0. */
export interface PaymentRequest {
  reservationId: string;
  offerId: string;
  slot: string;
  amountMinor: number;
  currency: 'EUR';
  mode: 'ONLINE' | 'AT_HOTEL';
  paymentToken?: string;
}
export interface PaymentResponse {
  paymentId: string;
  status: 'CAPTURED' | 'POSTED_TO_FOLIO' | 'FAILED';
  amountMinor: number;
  currency: 'EUR';
  mode: 'ONLINE' | 'AT_HOTEL';
  createdAt: string;
}
export type PaymentResult = { ok: true; payment: PaymentResponse } | { ok: false; status: number; code: string };

/** Mock : le jeton `pvt_tok_decline` simule un refus de la banque. */
export function createPayment(req: PaymentRequest): PaymentResult {
  const offer = getOfferById(req.offerId);
  const option = offer?.options.find((o) => o.slot === req.slot);
  if (!offer || !option) return { ok: false, status: 409, code: 'LCO_OFFER_EXPIRED' };
  if (option.priceMinor !== req.amountMinor) return { ok: false, status: 409, code: 'LCO_AMOUNT_MISMATCH' };
  if (req.mode === 'ONLINE' && req.paymentToken === 'pvt_tok_decline') return { ok: false, status: 402, code: 'LCO_PAYMENT_DECLINED' };
  return {
    ok: true,
    payment: {
      paymentId: `PAY-${req.reservationId.slice(4)}`,
      status: req.mode === 'ONLINE' ? 'CAPTURED' : 'POSTED_TO_FOLIO',
      amountMinor: req.amountMinor,
      currency: 'EUR',
      mode: req.mode,
      createdAt: new Date().toISOString(),
    },
  };
}
