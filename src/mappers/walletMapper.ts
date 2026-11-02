import type { Modalidade, TicketDTO, ViagemDTO } from '../types/api'
import type { Redemption, TicketOption, Trip } from '../types/wallet'

const optionIdPorModalidade: Record<Modalidade, string> = {
    ONIBUS: 'onibus',
    METRO: 'metro',
    TREM: 'cptm',
}

export const modalidadePorOpcao: Record<string, Modalidade> = {
    metro: 'METRO',
    cptm: 'TREM',
}

export function toRedemption(dto: TicketDTO): Redemption {
    return {
        id: dto.id,
        optionId: optionIdPorModalidade[dto.modalidade],
        points: dto.custoEmPontos,
        delivery: dto.formaRecebimento === 'RECARGA' ? 'recarga' : 'qrCode',
        ticketCode: dto.id,
        payload: dto.qrCodeHash,
        expiresAt: `${dto.dataExpiracao}T23:59:00`,
    }
}

export function toTrip(dto: ViagemDTO, linhas: Map<string, string>, estacoes: Map<string, string>): Trip {
    return {
        id: dto.id,
        lineName: linhas.get(dto.linha) ?? dto.linha,
        stationName: estacoes.get(dto.estacaoEmbarque) ?? dto.estacaoEmbarque,
        registeredAt: dto.dataViagem,
        points: dto.pontosGerados,
    }
}

export function toTicketOption(dto: TicketDTO): TicketOption {
    return {
        id: dto.id,
        label: `${dto.modalidade} · ${dto.id.slice(0, 8)}`,
        status: dto.status,
    }
}
