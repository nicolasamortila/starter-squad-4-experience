import type { FastifyInstance } from 'fastify';
import { sendError } from './errors.js';
import { isEnabled, type Flags } from './flags.js';

export const FLAG = 'lco_experience_card';

/**
 * Route du volet Expérience, définie par teams/squad-4-experience/contracts/ecrans.md.
 * Bouchon : la squad l'implémente avec /speckit-implement, d'après sa spec et son contrat v1.
 */
export function registerRoutes(app: FastifyInstance, flags: Flags): void {
  app.get<{ Params: { reservationId: string } }>('/v1/manage-booking/:reservationId/late-checkout-card', async (_request, reply) => {
    if (!isEnabled(flags, FLAG)) {
      return sendError(reply, 404, 'LCO_FEATURE_DISABLED', `Fonctionnalité désactivée (flag ${FLAG})`);
    }
    return sendError(reply, 501, 'LCO_NOT_IMPLEMENTED', 'À implémenter : voir la spec de la squad');
  });
}
