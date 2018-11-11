import { Button, CircularProgress, Grid, TextField } from '@material-ui/core';
import { Link } from '@reach/router';
import { RouteComponentProps } from '@reach/router';
import * as React from 'react';
import NumberFormat from 'react-number-format';
// import MaskedInput from 'react-text-mask';
import { Subscribe } from 'unstated';
import AddressContainer from '../../containers/AddressContainer/index';

interface IProps extends RouteComponentProps<any> {

}

interface IState {
    zip_code: string;
}

class Home extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            zip_code: '',
        }
    }

    public handleChange = (e: any) => {
        this.setState({ zip_code: e.target.value });
    }

    public render() {
        const { zip_code } = this.state;

        return (
            <Subscribe to={[AddressContainer]}>
                {
                    (address: AddressContainer) => (
                        <React.Fragment>
                            <Grid container={true} spacing={0} alignItems='center' style={{ height: '80vh' }} justify='center'>
                                <Grid item={true} >
                                    <Grid container={true} spacing={24}>
                                        {
                                            address.state.isFetching && <CircularProgress size={60} />
                                        }
                                        {
                                            (!address.state.isFetching && !address.state.address) &&
                                            <React.Fragment>
                                                {/* <Grid item={true}>
                                                    <MaskedInput
                                                        showMask={true}
                                                        mask={[/[1-9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
                                                        onChange={this.handleChange}
                                                        placeholderChar={'\u2000'}
                                                        value={zip_code}
                                                        render={(ref: any, props: any) => {
                                                            return (<TextField
                                                                inputRef={ref}
                                                                {...props}
                                                            />);
                                                        }} />
                                                </Grid> */}
                                                <Grid item={true}>
                                                    <NumberFormat value={zip_code} onChange={this.handleChange} format='#####-###' customInput={TextField} />
                                                </Grid>
                                                <Grid item={true}>
                                                    <Button variant='contained' color='primary' onClick={() => address.search(zip_code)}>Buscar</Button>
                                                </Grid>
                                                <Grid item={true} xs={12}>
                                                    {address.state.error && <p>CEP não encontrado</p>}
                                                </Grid>
                                            </React.Fragment>
                                        }
                                        {
                                            (!address.state.isFetching && address.state.address) &&
                                            <React.Fragment>
                                                <Grid item={true} xs={12}>
                                                    <p>
                                                        CEP Encontrado!
                                    </p>
                                                </Grid>
                                                <Grid item={true} xs={12}>
                                                    <Link to='/detail'>Ver detalhes</Link>
                                                </Grid>
                                            </React.Fragment>
                                        }
                                    </Grid>
                                </Grid>
                            </Grid>
                        </React.Fragment>
                    )
                }
            </Subscribe>
        );
    }
}

export default Home;