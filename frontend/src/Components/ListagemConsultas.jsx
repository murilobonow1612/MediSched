import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Style/ListagemConsultas.css';

const ListagemConsultas = () => {
  const [consultas, setConsultas] = useState([]);
  const [filtroPaciente, setFiltroPaciente] = useState('');
  const [filtroMedico, setFiltroMedico] = useState('');
  const [filtroData, setFiltroData] = useState('');

  // Função reutilizável para buscar consultas
  const fetchConsultas = async () => {
    try {
      const response = await axios.get('http://localhost:8080/consultas');
      setConsultas(response.data);
    } catch (error) {
      console.error('Erro ao buscar consultas:', error);
      alert('Erro ao carregar consultas.');
    }
  };

  useEffect(() => {
    fetchConsultas();
  }, []);

  const cancelarConsulta = async (id) => {
    if (!window.confirm('Tem certeza que deseja cancelar esta consulta?')) return;

    try {
      await axios.delete(`http://localhost:8080/consultas/${id}`);
      alert('Consulta cancelada com sucesso!');
      fetchConsultas(); // Atualiza a lista
    } catch (error) {
      console.error('Erro ao cancelar consulta:', error);
      alert('Erro ao cancelar a consulta.');
    }
  };

  const filtrarConsultas = (c) => {
    const dataConsulta = new Date(c.dataHora).toISOString().split('T')[0];
    return (
      (!filtroPaciente || c.paciente?.nome?.toLowerCase().includes(filtroPaciente.toLowerCase())) &&
      (!filtroMedico || c.medico?.nome?.toLowerCase().includes(filtroMedico.toLowerCase())) &&
      (!filtroData || filtroData === dataConsulta)
    );
  };

  const hoje = new Date();

  const futuras = consultas.filter(
    (c) => new Date(c.dataHora) >= hoje && filtrarConsultas(c)
  );

  const passadas = consultas.filter(
    (c) => new Date(c.dataHora) < hoje && filtrarConsultas(c)
  );

  return (
    <div className="container-listagem">
      <h2 className="heading">Consultas Agendadas</h2>

      <div className="filtros">
        <input
          type="text"
          className="input"
          placeholder="Filtrar por paciente"
          value={filtroPaciente}
          onChange={(e) => setFiltroPaciente(e.target.value)}
        />
        <input
          type="text"
          className="input"
          placeholder="Filtrar por médico"
          value={filtroMedico}
          onChange={(e) => setFiltroMedico(e.target.value)}
        />
        <input
          type="date"
          className="input"
          value={filtroData}
          onChange={(e) => setFiltroData(e.target.value)}
        />
      </div>

      <h3>Consultas Futuras</h3>
      {futuras.length === 0 ? (
        <p className="empty-msg">Nenhuma consulta futura encontrada.</p>
      ) : (
        <ul className="lista-consultas">
          {futuras.map((c) => (
            <li key={c.id} className="consulta-card">
              <p><strong>Paciente:</strong> {c.paciente?.nome}</p>
              <p><strong>Médico:</strong> {c.medico?.nome}</p>
              <p><strong>Data e Hora:</strong> {new Date(c.dataHora).toLocaleString('pt-BR')}</p>
              <p><strong>Sintomas:</strong> {c.sintomas}</p>
              <p><strong>Status:</strong> {c.status}</p>
              <button
                className="cancelar-btn"
                onClick={() => cancelarConsulta(c.id)}
              >
                Cancelar
              </button>
            </li>
          ))}
        </ul>
      )}

      <h3>Consultas Passadas</h3>
      {passadas.length === 0 ? (
        <p className="empty-msg">Nenhuma consulta passada encontrada.</p>
      ) : (
        <ul className="lista-consultas">
          {passadas.map((c) => (
            <li key={c.id} className="consulta-card">
              <p><strong>Paciente:</strong> {c.paciente?.nome}</p>
              <p><strong>Médico:</strong> {c.medico?.nome}</p>
              <p><strong>Data e Hora:</strong> {new Date(c.dataHora).toLocaleString('pt-BR')}</p>
              <p><strong>Sintomas:</strong> {c.sintomas}</p>
              <p><strong>Status:</strong> {c.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListagemConsultas;
