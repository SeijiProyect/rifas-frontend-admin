import { Persona } from "./persona.model"
import { Itinerario } from "./itinerario.model"

export interface Pasajero {
    id: number,
    nombre?: string,
    apellido?: string,
    itinerario?: Itinerario,
    persona?:Persona,
    univesidad?: string,
    acompaniante?:string,
    estado?:string,
    comentarios:string,
}
