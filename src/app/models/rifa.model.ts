import { Organizador } from "./organizador.model"

export interface Rifa {
    id: number,
    nombre: string,
    descripcion: string,
    fecha_inicio?: Date,
    fecha_fin?: Date,
    organizador?:Organizador
}