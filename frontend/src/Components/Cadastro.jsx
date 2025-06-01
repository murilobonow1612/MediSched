import React, { useState } from 'react';
import '../style/Cadastro.css';
const Cadastro = () => {
  const [isPatient, setIsPatient] = useState(true);

  const handleRoleChange = (role) => {
    setIsPatient(role === 'patient');
  };

  return (
    <div className="container-cadastro">
      <div className="heading">Cadastro</div>

      <form action="" className="form-cadastro">
        <input required className="input" type="email" name="email" id="email" placeholder="E-mail" />
        <input required className="input" type="password" name="password" id="password" placeholder="Password" />
        <span className="forgot-password"><a href="#">Esqueceu a senha?</a></span>
        <input className="login-button" type="submit" value="Logar" />
      </form>

    

      </div>
  );
};

export default Cadastro;
