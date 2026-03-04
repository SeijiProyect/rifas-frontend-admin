export interface Documento {
    id: number,
    numero: string,
    fecha_exp?: Date,
    fecha_venc?: Date,
    tipo: string,
    pais: string
}