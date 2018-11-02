import React, {Component} from 'react';

import Modal from '../../components/UI/Modal/Modal'
import Aukz from '../Aukz/Aukz'

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
    // anonymous class, without name, because im not gonna use it

    state = {
        error: null
    }


    componentDidMount(){
        axios.interceptors.request.use(request => {
            this.setState({
                error: null
            });
            return request;
        })
        axios.interceptors.response.use(response => response, error => {
            this.setState({
                error: error
            });
        })
    }

    errorConfirmedHandler = () => {
        this.setState({
            error: null
        })
    }

        render(){
        return (
            <Aukz>
                <Modal disp={this.state.error}
                       modalOut={this.errorConfirmedHandler}>
                    {this.state.error ? this.state.error.message : null}
                </Modal>
                <WrappedComponent {...this.props} />
            </Aukz>     
        )
    }
    }
};

export default withErrorHandler;