import { describe, expect, it } from 'vitest';
import { createPayment } from '../../src/mocks/paiement-api.js';

const base = { reservationId: 'RES-104233', offerId: 'LCO-104233', slot: '12:00', amountMinor: 2500, currency: 'EUR' as const };

describe('mock paiement-api v0', () => {
  it('encaisse en ligne', () => {
    expect(createPayment({ ...base, mode: 'ONLINE', paymentToken: 'pvt_tok_ok' })).toMatchObject({ ok: true, payment: { status: 'CAPTURED' } });
  });
  it("ajoute à la note de chambre", () => {
    expect(createPayment({ ...base, mode: 'AT_HOTEL' })).toMatchObject({ ok: true, payment: { status: 'POSTED_TO_FOLIO' } });
  });
  it('refuse un montant différent, une offre inconnue, une carte refusée', () => {
    expect(createPayment({ ...base, amountMinor: 1, mode: 'AT_HOTEL' })).toMatchObject({ ok: false, code: 'LCO_AMOUNT_MISMATCH' });
    expect(createPayment({ ...base, offerId: 'LCO-000000', mode: 'AT_HOTEL' })).toMatchObject({ ok: false, code: 'LCO_OFFER_EXPIRED' });
    expect(createPayment({ ...base, mode: 'ONLINE', paymentToken: 'pvt_tok_decline' })).toMatchObject({ ok: false, status: 402 });
  });
});
