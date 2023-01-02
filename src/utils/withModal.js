import Modal from 'component/Modal';
import ProviderForm, { contextForm } from 'context/contextForm';
import Alerts, { useAlerts } from 'component/Alerts';
//HOC (higher order components) para el renderizado de un componente dentro de un modal
//https://es.reactjs.org/docs/higher-order-components.html --> doc de react sobre los HOC
const withModal = (Component) => {
    //recibe un componente y retorna el mismo renderizado dentro de un modal
    //(normalemte usado para formularios)
    // por otra parte tambien renderiza con el estado de una alerta para el uso del modal
    return (props) => {

        const alert = useAlerts();

        return (
        <ProviderForm>
            <Modal {...props} alert={alert.handleOpen} context={contextForm} >
                <Component {...props}/>
            </Modal>
            <Alerts {...alert} redirect={props.redirect}/>
        </ProviderForm>
        );
    }
}

export default withModal;