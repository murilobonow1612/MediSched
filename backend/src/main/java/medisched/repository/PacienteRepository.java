package medisched.repository;

import medisched.model.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PacienteRepository extends JpaRepository<Paciente, Long> {
    Paciente findByEmailAndSenha(String email, String senha);
}


