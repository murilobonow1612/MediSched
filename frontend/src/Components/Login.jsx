import React, { useState } from 'react';
import '../style/Login.css';
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: '', senha: '' });

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/logar', credentials);

            const userData = response.data;
            console.log('Usuário logado:', userData);
            localStorage.setItem('user', JSON.stringify(userData)); // salva adm junto
            navigate('/Home');
        }
        catch (error) {
            console.error('Erro ao fazer login:', error);
            alert('Erro ao fazer login. Verifique suas credenciais.');
        }
    };

    return (
        <div className='container'>
            <div className="login">
                <div className="heading">Login</div>
                <form className="form-cadastro" onSubmit={handleSubmit}>
                    <div className='row'>
                        <input type="email" name="email" placeholder="Email" className="input" onChange={handleChange} required />
                    </div>

                    <div className='row'>
                        <input type="password" name="senha" placeholder="Senha" className="input" onChange={handleChange} required />
                    </div>

                    <button type="submit" className="login-button">Entrar</button>
                    <p id='txt_esqueceu_senha'>Esqueceu a senha? Crie uma nova aqui</p>
                    <p> <Link to="/cadastro" id='txt_esqueceu_senha'>Não tem uma conta? Cadastre-se</Link></p>

                </form>
            </div>
        </div>
    );
};
export default Login;