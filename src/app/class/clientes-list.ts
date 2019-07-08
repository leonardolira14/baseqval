import { Clientes } from './clientes';
export class ClientesList {
        private clienteslis: Clientes[] = [];
        constructor() {

        }
        public addcliente(Cliente) {
                this.clienteslis.push(Cliente);
        }
        public limpiarlista() {
            this.clienteslis = [];
        }
        public buscarpalabra(p: string) {
            return this.clienteslis.filter(cliente => cliente.Nombre.toLocaleLowerCase().includes(p.toLocaleLowerCase()));
        }
        public getList() {
            return this.clienteslis;
        }
        public buscar_grupo(grupo) {
            const listic = [];
            if (grupo === 'td') {
                return this.clienteslis;
            } else if (grupo === 'sn') {
                this.clienteslis.forEach(cliente => {
                    if (cliente.IDConfig === '0') {
                        listic.push(cliente);
                    }
                 });
                 return listic;
            } else {

               this.clienteslis.forEach(cliente => {
                   if (cliente.IDConfig === grupo) {
                    listic.push(cliente);
                   }

                });
                return listic;
            }
        }
}
