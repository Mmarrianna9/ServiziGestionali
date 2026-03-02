package com.example.gestionale.Repository;
import com.example.gestionale.Entity.Dipendente;
import org.springframework.data.jpa.repository.JpaRepository;
public interface DipendenteRepository extends JpaRepository<Dipendente, Long> {
Dipendente findByEmail(String email);
}
