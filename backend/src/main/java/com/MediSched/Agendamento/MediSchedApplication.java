package com.MediSched.Agendamento;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MediSchedApplication {

	public static void main(String[] args) {
		SpringApplication.run(MediSchedApplication.class, args);
		String url = "jdbc:mysql://localhost:3306/medisched"; // ajuste para seu banco
		String user = "root";
		String password = "1234";

		String sql = "INSERT INTO medico (nome, especialidade, horarios, email, senha) VALUES (?, ?, ?, ?, ?)";

		try (Connection conn = DriverManager.getConnection(url, user, password);
			 PreparedStatement stmt = conn.prepareStatement(sql)) {

			stmt.setString(1, "Dr. João Pedro");
			stmt.setString(2, "Ortopedia");
			stmt.setString(3, "das 14:00 às 16:30");
			stmt.setString(4, "drjoao@gmail.com");
			stmt.setString(5, "1234");

			int linhasAfetadas = stmt.executeUpdate();
			System.out.println("Inserção realizada! Linhas afetadas: " + linhasAfetadas);

		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}