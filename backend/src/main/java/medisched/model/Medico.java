package medisched.model;

import jakarta.persistence.Entity;
import lombok.Data;

@Entity
@Data
public class Medico extends Pessoa {

    private String especialidade;
    private String horarios;
}
