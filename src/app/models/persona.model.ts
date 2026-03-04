export interface Persona {
    id: number,
    nombres: string,
    apellidos: string,
    fecha_nac?: Date,
    direccion?: string,
    cedula:string,
    celular?:string,
    sexo?:string,
    email?:string,    
}