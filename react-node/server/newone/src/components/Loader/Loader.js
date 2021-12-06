import React from 'react';
import PropTypes from 'prop-types';
import { Modal , ModalBody } from 'reactstrap';
import './index.css'
class Loader extends React.Component {
    static propTypes = {
        size: PropTypes.number.isRequired
    };

    static defaultProps = {
        size: 21
    };

    render() {
        return (
            <Modal id='loadedModel' isOpen={this.props.isOpen} centered>
                <ModalBody className='LoaderBody'>
                    <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                </ModalBody>
            </Modal>
        );
    }
}

export default Loader;
