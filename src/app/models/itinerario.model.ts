
export interface Itinerario {
    id: number,
    idViaje?: number,
    idGrupo?: number,
    nombre?: string,
    precio:number,
    fechaInicio?:string,
    fechaFin?:string,
    comentarios?:string,
}
