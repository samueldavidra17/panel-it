import Modal from 'component/Modal';
import React from 'react';
import ProviderForm, { contextForm } from 'context/contextForm';

const withModal = (Component) => {
    return ({open, handleOpen, title, content, confirn, id}) => (
        <ProviderForm>
            <Modal {...{handleOpen, open, title, confirn, content}} context={contextForm} >
                <Component {...{id}}/>
            </Modal>
        </ProviderForm>
    );
}

export default withModal;