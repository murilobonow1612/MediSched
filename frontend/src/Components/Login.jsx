import React, { useState } from 'react';
import '../style/Cadastro.css'; // usa o mesmo CSS do Cadastro
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', senha: '' });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/logar', credentials);
      const userData = response.data;
      console.log('Usuário logado:', userData);
      localStorage.setItem('user', JSON.stringify(userData));
      navigate('/Home');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Erro ao fazer login. Verifique suas credenciais.');
    }
  };

  return (
    <div className="container-cadastro">
      <div className="heading">Login</div>
      <form className="form-cadastro" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="input"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="senha"
          placeholder="Senha"
          className="input"
          onChange={handleChange}
          required
        />

        <button type="submit" className="submit-button">Entrar</button>

        <p className="link-login">Esqueceu a senha? <a href="#">Crie uma nova aqui</a></p>
        <p className="link-login">Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link></p>
      </form>
    </div>
  );
};

export default Login;
