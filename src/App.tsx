import { useState } from 'react';
import './App.css';
import Modal from './components/Modal';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [isControllable, setControllable] = useState(false);
  return (
    <>
      <button
        onClick={() => {
          setShowModal(true);
          setControllable(true);
        }}
      >
        Authorize Controlled
      </button>

      <button
        onClick={() => {
          setShowModal(true);
          setControllable(false);
        }}
      >
        Authorize Uncontrolled
      </button>
      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          isControllable={isControllable}
        />
      )}
    </>
  );
}

export default App;
