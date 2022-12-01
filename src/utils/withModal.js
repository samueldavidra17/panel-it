import Modal from 'component/Modal';
import ProviderForm, { contextForm } from 'context/contextForm';
import Alerts, { useAlerts } from 'component/Alerts';

const withModal = (Component) => {

    
    return ({ open, handleOpen, title, content, confirn, id }) => {
        const alert = useAlerts();
        
        return (
        <ProviderForm>
            <Modal {...{ handleOpen, open, title, confirn, content, alert: alert.handleOpen, context: contextForm }}>
                <Component {...{ id }} />
            </Modal>
            <Alerts {...alert} />
        </ProviderForm>
        );
    }
}

export default withModal;