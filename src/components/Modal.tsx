import ReactDOM from 'react-dom';
import ControlledForm from './ControlledForm';
import UncontrolledForm from './UncontrolledForm';
interface AuthModalProps {
  onClose: () => void;
  isControllable: boolean;
}
export default function AuthModal(props: AuthModalProps) {
  const portalRoot = document.getElementById('portal-root');
  if (!portalRoot) return null;

  let form;
  if (props.isControllable) {
    form = <ControlledForm />;
  } else {
    form = <UncontrolledForm />;
  }
  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        {form}
        <button onClick={props.onClose}>Close</button>
      </div>
    </div>,
    portalRoot
  );
}
