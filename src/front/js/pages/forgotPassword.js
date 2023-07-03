import React, { useState } from 'react';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Lógica para enviar la solicitud de restablecimiento de contraseña al servidor
      console.log('Solicitud de restablecimiento de contraseña enviada para:', email);
      // Restablecer el estado del formulario
      setEmail('');
    } catch (error) {
      console.error('Error al enviar la solicitud de restablecimiento de contraseña:', error);
      
    }
  };

  return (
    <div>
      <h1>Olvidé mi contraseña</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Enviar solicitud</button>
      </form>
    </div>
  );
};

