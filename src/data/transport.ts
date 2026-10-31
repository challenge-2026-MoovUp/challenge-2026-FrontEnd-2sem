/** Linhas e estações aceitas no registro de viagem da carteira. */

export interface TransportLine {
    id: string
    operator: 'Metrô' | 'CPTM'
    name: string
    /** Cor oficial da linha, usada só como etiqueta visual. */
    color: string
    stations: string[]
}

export const transportLines: TransportLine[] = [
    {
        id: 'metro-1',
        operator: 'Metrô',
        name: 'Linha 1 · Azul',
        color: '#0B4DA2',
        stations: ['Jabaquara', 'Paraíso', 'Sé', 'Luz', 'Tucuruvi'],
    },
    {
        id: 'metro-2',
        operator: 'Metrô',
        name: 'Linha 2 · Verde',
        color: '#0E8A4C',
        stations: ['Vila Madalena', 'Consolação', 'Paraíso', 'Chácara Klabin', 'Vila Prudente'],
    },
    {
        id: 'metro-3',
        operator: 'Metrô',
        name: 'Linha 3 · Vermelha',
        color: '#C8102E',
        stations: ['Palmeiras-Barra Funda', 'República', 'Sé', 'Brás', 'Itaquera'],
    },
    {
        id: 'metro-4',
        operator: 'Metrô',
        name: 'Linha 4 · Amarela',
        color: '#F5B842',
        stations: ['Luz', 'República', 'Paulista', 'Pinheiros', 'Vila Sônia'],
    },
    {
        id: 'metro-5',
        operator: 'Metrô',
        name: 'Linha 5 · Lilás',
        color: '#8E6FB5',
        stations: ['Capão Redondo', 'Campo Belo', 'Santa Cruz', 'Chácara Klabin'],
    },
    {
        id: 'cptm-7',
        operator: 'CPTM',
        name: 'Linha 7 · Rubi',
        color: '#A3195B',
        stations: ['Luz', 'Barra Funda', 'Perus', 'Caieiras', 'Francisco Morato', 'Jundiaí'],
    },
    {
        id: 'cptm-8',
        operator: 'CPTM',
        name: 'Linha 8 · Diamante',
        color: '#9A9A9A',
        stations: ['Júlio Prestes', 'Osasco', 'Carapicuíba', 'Itapevi', 'Amador Bueno'],
    },
    {
        id: 'cptm-9',
        operator: 'CPTM',
        name: 'Linha 9 · Esmeralda',
        color: '#01A9A7',
        stations: ['Osasco', 'Pinheiros', 'Santo Amaro', 'Grajaú', 'Varginha'],
    },
    {
        id: 'cptm-10',
        operator: 'CPTM',
        name: 'Linha 10 · Turquesa',
        color: '#0A8DA8',
        stations: ['Brás', 'Tamanduateí', 'São Caetano do Sul', 'Santo André', 'Rio Grande da Serra'],
    },
    {
        id: 'cptm-11',
        operator: 'CPTM',
        name: 'Linha 11 · Coral',
        color: '#E04E39',
        stations: ['Luz', 'Brás', 'Itaquera', 'Guaianases', 'Mogi das Cruzes', 'Estudantes'],
    },
    {
        id: 'cptm-12',
        operator: 'CPTM',
        name: 'Linha 12 · Safira',
        color: '#133C8D',
        stations: ['Brás', 'Tatuapé', 'São Miguel Paulista', 'Itaim Paulista', 'Calmon Viana'],
    },
    {
        id: 'cptm-13',
        operator: 'CPTM',
        name: 'Linha 13 · Jade',
        color: '#0FA04A',
        stations: ['Engenheiro Goulart', 'Guarulhos-Cecap', 'Aeroporto-Guarulhos'],
    },
]

export function findLine(id: string) {
    return transportLines.find((line) => line.id === id)
}
