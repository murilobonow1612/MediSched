package medisched.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Medico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private String especialidade;

    private String horarios;

    private String email;

    private String senha;


}
