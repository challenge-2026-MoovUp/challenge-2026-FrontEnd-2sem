/* Resgates: o usuário troca pontos por ticket.

   ATENÇÃO — este é o arquivo mais incerto da camada. O trecho de RESGATES no
   contrato de 27/10 chegou truncado:

     "POST /usuarios/{id}/r 200 + lista dos tickets do usuário · erro 404"

   ou seja, faltou o body do POST e sobrou só o fim da descrição do GET.
   O desenho abaixo é a leitura mais provável (POST cria o resgate escolhendo a
   modalidade, GET lista os tickets do usuário), mas NÃO use em tela antes de o
   time do back confirmar. Erro esperado no POST: 422 (saldo insuficiente ou
   sem ticket no estoque). */

import type { Modalidade, TicketDTO } from '../types/api'
import { get, post } from './http'

/* TODO(contrato): confirmar o body. Pode ser { modalidade } ou { idTicket }. */
export interface NovoResgate {
    modalidade: Modalidade
}

/** POST /usuarios/{id}/resgates — troca pontos por um ticket. */
export function resgatar(idUsuario: string, body: NovoResgate) {
    return post<TicketDTO>(`/usuarios/${idUsuario}/resgates`, body)
}

/** GET /usuarios/{id}/resgates — tickets já resgatados pelo usuário. */
export function listarResgates(idUsuario: string) {
    return get<TicketDTO[]>(`/usuarios/${idUsuario}/resgates`)
}
