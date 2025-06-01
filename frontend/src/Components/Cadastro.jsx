import React, { useState } from 'react';
import '../style/Cadastro.css';
import axios from 'axios';
import {Link} from 'react-router-dom';

const Cadastro = () => {
  const [isMedico, setIsMedico] = useState(false);
  const [form, setForm] = useState({
    nome: '',
    cpf: '',
    nascimento: '',
    telefone: '',
    email: '',
    senha: '',
    especialidade: '',
    horarios: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isMedico ? 'http://localhost:8080/medicos' : 'http://localhost:8080/pacientes';
      const data = isMedico
        ? {
          nome: form.nome,
          especialidade: form.especialidade,
          horarios: form.horarios,
          email: form.email,
          senha: form.senha
        }
        : {
          nome: form.nome,
          cpf: form.cpf,
          nascimento: form.nascimento,
          telefone: form.telefone,
          email: form.email,
          senha: form.senha
        };
      await axios.post(url, data);
      alert('Cadastro realizado com sucesso!');
      setForm({ nome: '', cpf: '', nascimento: '', telefone: '', email: '', senha: '', especialidade: '', horarios: '' });
    } catch (error) {
      console.error('Erro no cadastro:', error);
      alert('Erro ao cadastrar: ' + (error.response ? error.response.data : 'Tente novamente mais tarde.'));
    }
  };

  return (
    <div className="container-cadastro">
      <div className="heading">{isMedico ? 'Cadastro de médico' : 'Cadastro de paciente'}</div>

      <div className="checkbox-container">
        <label>
          <input
            type="checkbox"
            checked={isMedico}
            onChange={() => setIsMedico(!isMedico)}
          />
          Sou médico
        </label>
      </div>

      <form className="form-cadastro" onSubmit={handleSubmit}>
        <input
          required
          className="input"
          type="text"
          name="nome"
          placeholder="Nome"
          value={form.nome}
          onChange={handleChange}
        />

        {isMedico ? (
          <>
            <input
              required
              className="input"
              type="text"
              name="especialidade"
              placeholder="Especialidade"
              value={form.especialidade}
              onChange={handleChange}
            />
            <input
              required
              className="input"
              type="text"
              name="horarios"
              placeholder="Horários de atendimento"
              value={form.horarios}
              onChange={handleChange}
            />
          </>
        ) : (
          <>
            <input
              required
              className="input"
              type="text"
              name="cpf"
              placeholder="CPF"
              value={form.cpf}
              onChange={handleChange}
            />
            <input
              required
              className="input"
              type="date"
              name="nascimento"
              placeholder="Nascimento"
              value={form.nascimento}
              onChange={handleChange}
            />
            <input
              required
              className="input"
              type="text"
              name="telefone"
              placeholder="Telefone"
              value={form.telefone}
              onChange={handleChange}
            />
          </>
        )}

        <input
          required
          className="input"
          type="email"
          name="email"
          placeholder="E-mail"
          value={form.email}
          onChange={handleChange}
        />
        <input
          required
          className="input"
          type="password"
          name="senha"
          placeholder="Senha"
          value={form.senha}
          onChange={handleChange}
        />

        <input className="submit-button" type="submit" value="Cadastrar" />
        <p className="link-login">
          Já tem uma conta? <Link to="/login">Faça login</Link>
        </p>
      </form>
    </div>
  );
};

export default Cadastro;
