package medisched.controller;

import medisched.model.Paciente;
import medisched.repository.PacienteRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pacientes")
public class PacienteController {

    private final PacienteRepository repository;

    public PacienteController(PacienteRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Paciente> listar() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Paciente buscar(@PathVariable Long id) {
        return repository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public Paciente atualizar(@PathVariable Long id, @RequestBody Paciente dadosAtualizados) {
        return repository.findById(id).map(pacienteExistente -> {
            pacienteExistente.setNome(dadosAtualizados.getNome());
            pacienteExistente.setCpf(dadosAtualizados.getCpf());
            pacienteExistente.setEmail(dadosAtualizados.getEmail());
            pacienteExistente.setNascimento(dadosAtualizados.getNascimento());
            pacienteExistente.setTelefone(dadosAtualizados.getTelefone());
            pacienteExistente.setSenha(dadosAtualizados.getSenha());
            return repository.save(pacienteExistente);
        }).orElse(null);
    }


    @PostMapping
    public Paciente cadastrar(@RequestBody Paciente paciente) {
        return repository.save(paciente);
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id) {
        repository.deleteById(id);
    }
}

