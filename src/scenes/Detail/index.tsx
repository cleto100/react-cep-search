import { Button, Grid } from '@material-ui/core';
import { Redirect } from '@reach/router';
import { RouteComponentProps } from '@reach/router';
import * as React from 'react';
import { Subscribe } from 'unstated';
import AddressContainer from '../../containers/AddressContainer/index';

interface IProps extends RouteComponentProps<any> {

}


class Detail extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        return (
            <Subscribe to={[AddressContainer]}>
                {
                    (address: AddressContainer) => (
                        <React.Fragment>
                            <Grid container={true} spacing={0} alignItems='center' style={{ height: '80vh' }} justify='center'>
                                <Grid item={true}>
                                    {
                                        (!address.state.isFetching && address.state.address) &&
                                        <React.Fragment>
                                            <p>
                                                Rua: {address.state.address.logradouro}
                                            </p>
                                            <p>
                                                Bairro: {address.state.address.bairro}
                                            </p>
                                            <p>
                                                Cidade: {address.state.address.localidade}
                                            </p>
                                            <p>
                                                UF: {address.state.address.uf}
                                            </p>
                                            <Button variant='contained' color='primary' onClick={() => address.clearSearch()}>Buscar novamente</Button>
                                        </React.Fragment>
                                    }
                                    {
                                        (!address.state.isFetching && !address.state.address) &&
                                        <Redirect to='/home' noThrow={true} />
                                    }
                                </Grid>
                            </Grid>
                        </React.Fragment>
                    )
                }
            </Subscribe>
        );
    }
}

export default Detail;
