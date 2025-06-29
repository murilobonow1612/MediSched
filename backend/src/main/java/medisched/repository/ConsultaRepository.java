package medisched.repository;

import medisched.model.Consulta;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.Optional;

public interface ConsultaRepository extends JpaRepository<Consulta, Long> {
    boolean existsByMedicoIdAndDataHora(Long medicoId, java.time.LocalDateTime dataHora);
    Optional<Consulta> findByMedicoIdAndDataHora(Long medicoId, LocalDateTime dataHora);

}

