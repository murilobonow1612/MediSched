// controller/LoginController.java
package medisched.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import medisched.dto.LoginRequest;
import medisched.model.Medico;
import medisched.model.Paciente;
import medisched.repository.MedicoRepository;
import medisched.repository.PacienteRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/logar")
public class LoginController {

    private final MedicoRepository medicoRepository;
    private final PacienteRepository pacienteRepository;

    public LoginController(MedicoRepository medicoRepository, PacienteRepository pacienteRepository) {
        this.medicoRepository = medicoRepository;
        this.pacienteRepository = pacienteRepository;
    }

    @PostMapping
    public ResponseEntity<?> login(@RequestBody LoginRequest login) {
        String email = login.getEmail();
        String senha = login.getSenha();

        // Tenta encontrar como médico
        Medico medico = medicoRepository.findByEmailAndSenha(email, senha);
        if (medico != null) {
            return ResponseEntity.ok(medico);
        }

        // Tenta encontrar como paciente
        Paciente paciente = pacienteRepository.findByEmailAndSenha(email, senha);
        if (paciente != null) {
            return ResponseEntity.ok(paciente);
        }

        // Não encontrado
        return ResponseEntity.status(401).body("Credenciais inválidas.");
    }
}
