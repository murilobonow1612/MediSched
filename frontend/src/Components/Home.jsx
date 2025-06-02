import React, { useEffect, useState } from "react";
import '../Style/Home.css';
import { Link } from "react-router-dom";

const Home = () => {
  const [nomeUsuario, setNomeUsuario] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const primeiroNome = user.nome ? user.nome.split(' ')[0] : 'Usuário';
      setNomeUsuario(primeiroNome);
    }
  }, []);

  return (
    <div className="welcome-container">
      <p className="welcome-title">Seja bem-vindo(a) <strong>{nomeUsuario}</strong>!<br /></p>

      <p className="welcome-text">
        <strong>MediSched</strong> é seu sistema confiável para agendamento de consultas médicas.<br />
        Aqui você pode marcar, acompanhar e gerenciar suas consultas com <strong>facilidade,
          segurança e praticidade.</strong> Conte conosco para cuidar da sua saúde!
      </p>

      <p className="welcome-count">
        Você tem <Link to="/listagem-consultas" className="link-consultas">2 consultas agendadas</Link>
      </p>

      <Link to={"/agendar-consulta"}>
        <button className="btn-agendar">Agendar nova consulta</button>
      </Link>

      <div className="info-extra">
        <h2 id="ie_1">📌 Como funciona</h2>
        <ul>
          <li>Escolha o médico, o dia e o horário disponíveis</li>
          <li>Descreva seus sintomas (opcional)</li>
          <li>Acompanhe, remarque ou cancele sua consulta</li>
        </ul>

        <div className="container_ie">
          <div className="section_ie1">
            <h2>📞 Suporte</h2>
            <p>Email: suporte@medisched.com</p>
            <p>Telefone: (11) 4002-8922</p>
          </div>

          <div className="section_ie2">
            <h2>⏰ Horários de atendimento</h2>
            <p>Segunda a Sexta: 08h às 18h</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
