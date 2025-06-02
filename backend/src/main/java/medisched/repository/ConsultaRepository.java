package medisched.repository;

import medisched.model.Consulta;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConsultaRepository extends JpaRepository<Consulta, Long> {
    boolean existsByMedicoIdAndDataHora(Long medicoId, java.time.LocalDateTime dataHora);
}

