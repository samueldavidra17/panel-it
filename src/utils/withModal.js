import Modal from 'component/Modal';
import ProviderForm, { contextForm } from 'context/contextForm';
import Alerts, { useAlerts } from 'component/Alerts';

const withModal = (Component) => {
    return (props) => {

        const alert = useAlerts();
        
        return (
        <ProviderForm>
            <Modal {...props} alert={alert.handleOpen} context={contextForm} >
                <Component {...props}/>
            </Modal>
            <Alerts {...alert} />
        </ProviderForm>
        );
    }
}

export default withModal;