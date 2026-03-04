export class ItinerarioPasajero {
    constructor(
        public itinerarioPasajero_id: number,
        public pasajero_id: number,
        public itinerario_id: number,
        public itinerarioPasajero_passport: string,
        public itinerarioPasajero_passportExp: string,
        public itinerarioPasajero_passportVenc: string,
        public itinerarioPasajero_status: string,
        public itinerarioPasajero_rifas: any,
        public itinerarioPasajero_comments: string,
        public itinerarioPasajero_nationality: string,
        public itinerarioPasajero_file: string,
        public itinerarioPasajero_acompanante: any,
        public itinerarioPasajero_extraCost: number,
        public itinerarioPasajero_visasDiff: number,
        public itinerarioPasajero_discount: number,
        public itinerarioPasajero_insurance: number,
        public itinerarioPasajero_upgrade: number,
        public itinerarioPasajero_subGrupo: string
    ) { }
}
