// MedicoController.java
package medisched.controller;


import medisched.model.Medico;
import medisched.repository.MedicoRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/medicos")
public class MedicoController {

    private final MedicoRepository repository;

    public MedicoController(MedicoRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Medico> listar() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Medico buscar(@PathVariable Long id) {
        return repository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Medico> atualizar(@PathVariable Long id, @RequestBody Medico medicoAtualizado) {
        return repository.findById(id)
                .map(medico -> {
                    medico.setNome(medicoAtualizado.getNome());
                    medico.setEspecialidade(medicoAtualizado.getEspecialidade());
                    medico.setHorarios(medicoAtualizado.getHorarios());
                    medico.setEmail(medicoAtualizado.getEmail());
                    medico.setSenha(medicoAtualizado.getSenha());
                    Medico medicoSalvo = repository.save(medico);
                    return ResponseEntity.ok(medicoSalvo);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Medico cadastrar(@RequestBody Medico medico) {
        return repository.save(medico);
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id) {
        repository.deleteById(id);
    }

}

