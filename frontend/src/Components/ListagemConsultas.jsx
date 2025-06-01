import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Style/ListagemConsultas.css';

const ListagemConsultas = () => {
  const [consultas, setConsultas] = useState([]);
  const [filtroPaciente, setFiltroPaciente] = useState('');
  const [filtroMedico, setFiltroMedico] = useState('');
  const [filtroData, setFiltroData] = useState('');

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
      fetchConsultas();
    } catch (error) {
      console.error('Erro ao cancelar consulta:', error);
      alert('Erro ao cancelar a consulta.');
    }
  };

  const finalizarConsulta = async (id) => {
  if (!window.confirm('Deseja marcar esta consulta como finalizada?')) return;

  try {
    // Busca a consulta atual
    const consultaResponse = await axios.get(`http://localhost:8080/consultas/${id}`);
    const c = consultaResponse.data;

    const consultaAtualizada = {
      dataHora: c.dataHora,
      sintomas: c.sintomas,
      status: "FINALIZADA",
      pacienteId: c.paciente.id,
      medicoId: c.medico.id
    };

    await axios.put(`http://localhost:8080/consultas/${id}`, consultaAtualizada);

    alert('Consulta finalizada com sucesso!');
    fetchConsultas();
  } catch (error) {
    console.error('Erro ao finalizar consulta:', error);
    alert('Erro ao finalizar a consulta.');
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

  const futuras = consultas.filter(
    (c) => c.status !== 'FINALIZADA' && filtrarConsultas(c)
  );

  const passadas = consultas.filter(
    (c) => c.status === 'FINALIZADA' && filtrarConsultas(c)
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
              <button className="cancelar-btn" onClick={() => cancelarConsulta(c.id)}>
                Cancelar
              </button>
              <button className="finalizar-btn" onClick={() => finalizarConsulta(c.id)}>
                Finalizar
              </button>
            </li>
          ))}
        </ul>
      )}

      <h3>Consultas Finalizadas</h3>
      {passadas.length === 0 ? (
        <p className="empty-msg">Nenhuma consulta finalizada encontrada.</p>
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
