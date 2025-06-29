package medisched.model;
import jakarta.persistence.*;
import lombok.Data;

@MappedSuperclass
@Data
public abstract class Pessoa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String email;
    private String senha;

    @PrePersist
    @PreUpdate
    public void validarSenha() {
        if (senha == null || senha.length() < 8 || !senha.matches(".*[^a-zA-Z0-9].*")) {
            throw new IllegalArgumentException("A senha deve ter no mínimo 8 caracteres e conter pelo menos 1 caractere especial.");
        }
    }
}
