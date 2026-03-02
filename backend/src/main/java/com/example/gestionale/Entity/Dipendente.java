package com.example.gestionale.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "dipendenti")
@Data
public class Dipendente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String cognome;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String ruolo; // Esempio: "ADMIN", "USER", "MANAGER"

    private Double stipendio;
}


