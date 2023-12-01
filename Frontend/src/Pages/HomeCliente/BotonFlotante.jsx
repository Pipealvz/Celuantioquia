import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import './BotonFlotante.css'; // Estilo del botón

const BotonFlotante = () => {
  const abrirChatWhatsapp = () => {
    // Reemplaza el siguiente enlace con el enlace de tu chat de WhatsApp
    const enlaceWhatsapp = 'https://wa.me/+573107275678?text=Hola, estoy interesado en más productos, deseo comunicarme con un asesor.';
    window.open(enlaceWhatsapp, '_blank');
  };

  return (
    <div className="boton-flotante" onClick={abrirChatWhatsapp}>
      <FaWhatsapp />
    </div>
  );
};

export default BotonFlotante;