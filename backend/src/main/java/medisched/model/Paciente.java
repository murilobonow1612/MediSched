package medisched.model;

import jakarta.persistence.Entity;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
public class Paciente extends Pessoa {

    private String cpf;
    private LocalDate nascimento;
    private String telefone;
}