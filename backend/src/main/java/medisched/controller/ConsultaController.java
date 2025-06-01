package medisched.controller;

import medisched.dto.ConsultaDTO;
import medisched.model.Consulta;
import medisched.model.Medico;
import medisched.model.Paciente;
import medisched.repository.ConsultaRepository;
import medisched.repository.MedicoRepository;
import medisched.repository.PacienteRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/consultas")
public class ConsultaController {

    private final ConsultaRepository consultaRepository;
    private final MedicoRepository medicoRepository;
    private final PacienteRepository pacienteRepository;

    public ConsultaController(ConsultaRepository consultaRepository, MedicoRepository medicoRepository, PacienteRepository pacienteRepository) {
        this.consultaRepository = consultaRepository;
        this.medicoRepository = medicoRepository;
        this.pacienteRepository = pacienteRepository;
    }

    @GetMapping
    public List<Consulta> listar() {
        return consultaRepository.findAll();
    }

    @GetMapping("/{id}")
    public Consulta buscar(@PathVariable Long id) {
        return consultaRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public Consulta atualizar(@PathVariable Long id, @RequestBody ConsultaDTO dto) {
        if (dto.getMedicoId() == null) {
            throw new RuntimeException("ID do médico não pode ser nulo.");
        }

        if (dto.getPacienteId() == null) {
            throw new RuntimeException("ID do paciente não pode ser nulo.");
        }

        Consulta consultaExistente = consultaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Consulta não encontrada com id: " + id));

        Medico medico = medicoRepository.findById(dto.getMedicoId())
                .orElseThrow(() -> new RuntimeException("Médico não encontrado com id: " + dto.getMedicoId()));

        Paciente paciente = pacienteRepository.findById(dto.getPacienteId())
                .orElseThrow(() -> new RuntimeException("Paciente não encontrado com id: " + dto.getPacienteId()));

        consultaExistente.setDataHora(dto.getDataHora());
        consultaExistente.setSintomas(dto.getSintomas());
        consultaExistente.setMedico(medico);
        consultaExistente.setPaciente(paciente);
        consultaExistente.setStatus(dto.getStatus() != null ? dto.getStatus() : consultaExistente.getStatus());

        return consultaRepository.save(consultaExistente);
    }



    @PostMapping
    public Consulta agendar(@RequestBody ConsultaDTO dto) {
        Medico medico = medicoRepository.findById(dto.getMedicoId()).orElseThrow();
        Paciente paciente = pacienteRepository.findById(dto.getPacienteId()).orElseThrow();

        Consulta consulta = new Consulta();
        consulta.setDataHora(dto.getDataHora());
        consulta.setSintomas(dto.getSintomas());
        consulta.setMedico(medico);
        consulta.setPaciente(paciente);
        consulta.setStatus(dto.getStatus() != null ? dto.getStatus() : "AGENDADA");

        return consultaRepository.save(consulta);
    }

    @DeleteMapping("/{id}")
    public void cancelar(@PathVariable Long id) {
        consultaRepository.deleteById(id);
    }
}
