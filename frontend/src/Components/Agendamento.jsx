import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Style/Agendamento.css';

const Agendamento = () => {
  const [medicos, setMedicos] = useState([]);
  const [medico, setMedico] = useState('');
  const [horarios, setHorarios] = useState([]);
  const [horario, setHorario] = useState('');
  const [data, setData] = useState(''); // NOVO: estado para a data
  const [sintomas, setSintomas] = useState('');
  const [consultaMarcada, setConsultaMarcada] = useState(false);
  const [consultaId, setConsultaId] = useState(null);

  useEffect(() => {
    const fetchMedicos = async () => {
      try {
        const response = await axios.get('http://localhost:8080/medicos');
        setMedicos(response.data);
      } catch (error) {
        console.error('Erro ao buscar médicos:', error);
        alert('Erro ao carregar médicos.');
      }
    };
    fetchMedicos();
  }, []);

  const handleMedicoChange = (e) => {
    const selectedId = e.target.value;
    const selectedMedico = medicos.find((m) => m.id.toString() === selectedId);
    setMedico(selectedId);

    const horariosStr = selectedMedico?.horarios || '';
    const horariosArray = horariosStr.split(',').map(h => h.trim());
    setHorarios(horariosArray);
    setHorario('');
  };

  const agendarConsulta = async () => {
    if (medico && horario && sintomas && data) {
      const usuario = JSON.parse(localStorage.getItem('user'));

      if (!usuario || !usuario.id) {
        alert("Usuário não está logado.");
        return;
      }

      try {
        const [horas, minutos] = horario.split(':');
        const [ano, mes, dia] = data.split('-');
        const dataHora = new Date(ano, mes - 1, dia, horas, minutos);

        // Corrigir o envio sem converter para UTC
        const dataHoraLocal = `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}T${horas.padStart(2, '0')}:${minutos.padStart(2, '0')}:00`;


        const response = await axios.post('http://localhost:8080/consultas', {
          medicoId: parseInt(medico),
          pacienteId: usuario.id,
          dataHora: dataHoraLocal,
          sintomas: sintomas,
          status: "AGENDADA"
        });

        setConsultaId(response.data.id);
        setConsultaMarcada(true);
        alert("Consulta agendada com sucesso!");
      } catch (error) {
        console.error('Erro ao agendar consulta:', error);
        alert("Erro ao agendar a consulta.");
      }
    } else {
      alert('Preencha todos os campos.');
    }
  };

  const cancelarConsulta = async () => {
    if (!consultaId) {
      alert("Nenhuma consulta para cancelar.");
      return;
    }

    try {
      await axios.delete(`http://localhost:8080/consultas/${consultaId}`);
      alert("Consulta cancelada com sucesso.");
    } catch (error) {
      console.error('Erro ao cancelar consulta:', error);
      alert("Erro ao cancelar a consulta.");
    }

    // Resetar o formulário
    setConsultaMarcada(false);
    setConsultaId(null);
    setMedico('');
    setHorario('');
    setData('');
    setSintomas('');
  };

  return (
    <div className="container-agendamento">
      <h2 className="heading">Agendamento de Consulta</h2>

      <form className="form-agendamento" onSubmit={(e) => e.preventDefault()}>
        <select className="input" value={medico} onChange={handleMedicoChange} required>
          <option value="">Escolha um médico</option>
          {medicos.map((m) => (
            <option key={m.id} value={m.id}>
              {m.nome} - {m.especialidade}
            </option>
          ))}
        </select>

        <input
          type="date"
          className="input"
          value={data}
          onChange={(e) => setData(e.target.value)}
          required
        />

        <select className="input" value={horario} onChange={(e) => setHorario(e.target.value)} required>
          <option value="">Escolha um horário</option>
          {horarios.map((h, i) => (
            <option key={i} value={h}>{h}</option>
          ))}
        </select>

        <textarea
          className="input"
          placeholder="Descreva os sintomas ou queixas"
          value={sintomas}
          onChange={(e) => setSintomas(e.target.value)}
          rows="4"
          required
        ></textarea>

        {!consultaMarcada ? (
          <button className="submit-button" onClick={agendarConsulta}>Agendar</button>
        ) : (
          <>
            <p className="success-msg">
              Consulta marcada para {new Date(`${data}T${horario}`).toLocaleString('pt-BR')}
            </p>
            <button className="cancel-button" onClick={cancelarConsulta}>Cancelar/Remarcar</button>
          </>
        )}
      </form>
    </div>
  );
};

export default Agendamento;
