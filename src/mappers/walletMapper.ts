/* Tradução TicketDTO → Redemption (o tipo que QrTicket e WalletTimeline leem).

   Nem tudo da carteira tem equivalente na API: o tipo Trip (linha + estação +
   pontos) não existe no contrato — só o histórico de impacto, que traz
   modalidade/km/CO2 sem identificar linha ou estação, e não há endpoint para
   registrar viagem. Enquanto isso, viagem continua local no WalletProvider. */

import type { Modalidade, TicketDTO } from '../types/api'
import type { Redemption } from '../types/wallet'

/** Modalidade da API → id das opções em data/points.ts (redeemOptions). */
const optionIdPorModalidade: Record<Modalidade, string> = {
    ONIBUS: 'onibus',
    METRO: 'metro',
    TREM: 'cptm',
}

export function toRedemption(dto: TicketDTO): Redemption {
    return {
        id: dto.id,
        optionId: optionIdPorModalidade[dto.modalidade],
        points: dto.custoEmPontos,
        /* A API só entrega ticket com QR; recarga em cartão é fluxo local. */
        delivery: 'qrCode',
        ticketCode: dto.id,
        payload: dto.qrCodeHash,
        /* O contrato não devolve data de criação do ticket; a expiração é a
           única referência temporal disponível. */
        createdAt: dto.dataExpiracao,
        expiresAt: dto.dataExpiracao,
    }
}

/** Resgates do usuário prontos para a timeline, mais recentes primeiro. */
export function toRedemptions(tickets: TicketDTO[]): Redemption[] {
    return tickets
        .map(toRedemption)
        .sort((a, b) => b.expiresAt.localeCompare(a.expiresAt))
}
