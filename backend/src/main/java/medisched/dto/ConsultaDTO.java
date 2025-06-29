package medisched.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ConsultaDTO {
    private LocalDateTime dataHora;
    private String sintomas;
    private Long medicoId;
    private Long pacienteId;
    private String status;
}