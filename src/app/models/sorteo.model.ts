import { Rifa } from "./rifa.model"

export interface Sorteo {
    id: number,
    fecha_sorteo?: Date,
    rifa?: Rifa,
    numero_sorteo?: number,
    lugar?: string,
    numero_inicial_talon?: number,
    numero_final_talon?: number,
    talon_valor?: number,
    porcentaje_comision?: number,
}
