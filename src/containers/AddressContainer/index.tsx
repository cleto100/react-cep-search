import { Container } from 'unstated';

interface IAddress {
    logradouro: string;
    uf: string;
    bairro: string;
    localidade: string;
    erro: boolean;
}

export interface IState {
    isFetching: boolean;
    address: IAddress | null;
    error: boolean;
};

class AddressContainer extends Container<IState>{
    constructor() {
        super();
        this.state = {
            address: null,
            error: false,
            isFetching: false,
        };
    }

    public search = async (zipCode: string) => {
        this.setState({ isFetching: true, error: false });
        try {
            const response = await fetch(`https://viacep.com.br/ws/${zipCode}/json/`);
            const address: IAddress = await response.json();
            if (!address.erro) {
                this.setState({ isFetching: false, address });
            } else {
                throw new Error('Não encontrado');
            }
        } catch (error) {
            this.setState({ error: true, isFetching: false });
        }
    }

    public clearSearch = () => {
        this.setState({ address: null });
    }
}

export default AddressContainer;