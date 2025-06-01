package medisched.repository;

import medisched.model.Medico;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicoRepository extends JpaRepository<Medico, Long> {
    Medico findByEmailAndSenha(String email, String senha);
}

