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
}
