package medisched.controller;

import medisched.dto.ConsultaDTO;
import medisched.model.Consulta;
import medisched.model.Medico;
import medisched.model.Paciente;
import medisched.repository.ConsultaRepository;
import medisched.repository.MedicoRepository;
import medisched.repository.PacienteRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import medisched.enums.StatusConsulta;
import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import org.springframework.http.HttpStatus;


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
        if (dto.getStatus() != null) {
            consultaExistente.setStatus(StatusConsulta.valueOf(dto.getStatus()));
        }


        return consultaRepository.save(consultaExistente);
    }

    @PostMapping
    public ResponseEntity<?> criarConsulta(@RequestBody ConsultaDTO consultaDTO) {
        try {
            // Converte a string recebida no formato ISO (ex: 2025-06-29T15:00:00)
            LocalDateTime dataHoraConsulta = consultaDTO.getDataHora();


            // ✅ Validação: impedir agendamento em data/hora passada
            if (dataHoraConsulta.isBefore(LocalDateTime.now())) {
                return ResponseEntity
                        .badRequest()
                        .body("A data e hora da consulta não podem estar no passado.");
            }

            // ✅ Verifica se já existe uma consulta com o mesmo médico e horário
            Optional<Consulta> conflito = consultaRepository.findByMedicoIdAndDataHora(
                    consultaDTO.getMedicoId(), dataHoraConsulta
            );
            if (conflito.isPresent()) {
                return ResponseEntity
                        .badRequest()
                        .body("Já existe uma consulta marcada para esse médico nesse horário.");
            }

            // Busca médico e paciente
            Medico medico = medicoRepository.findById(consultaDTO.getMedicoId())
                    .orElseThrow(() -> new RuntimeException("Médico não encontrado."));
            Paciente paciente = pacienteRepository.findById(consultaDTO.getPacienteId())
                    .orElseThrow(() -> new RuntimeException("Paciente não encontrado."));

            // Extrai somente a parte da hora solicitada (ex: "15:00")
            String horaSolicitada = dataHoraConsulta.toLocalTime().toString().substring(0,5);

            // Verifica se o horário está dentro dos horários disponíveis do médico
            String[] horariosDisponiveis = medico.getHorarios().split(",");
            boolean horarioValido = Arrays.stream(horariosDisponiveis)
                    .map(String::trim)
                    .anyMatch(h -> h.equals(horaSolicitada));

            if (!horarioValido) {
                return ResponseEntity
                        .badRequest()
                        .body("O horário solicitado não está disponível para o médico selecionado.");
            }


            // Cria e salva a consulta
            Consulta novaConsulta = new Consulta();
            novaConsulta.setMedico(medico);
            novaConsulta.setPaciente(paciente);
            novaConsulta.setDataHora(dataHoraConsulta);
            novaConsulta.setSintomas(consultaDTO.getSintomas());
            novaConsulta.setStatus(StatusConsulta.AGENDADA);

            Consulta salva = consultaRepository.save(novaConsulta);
            return ResponseEntity.ok(salva);

        } catch (DateTimeParseException e) {
            return ResponseEntity
                    .badRequest()
                    .body("Formato de data/hora inválido. Use o padrão: yyyy-MM-ddTHH:mm:ss");

        } catch (RuntimeException e) {
            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao agendar consulta.");
        }
    }




    @DeleteMapping("/{id}")
    public void cancelar(@PathVariable Long id) {
        consultaRepository.deleteById(id);
    }
}
