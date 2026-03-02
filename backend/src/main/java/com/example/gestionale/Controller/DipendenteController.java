package com.example.gestionale.Controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin; // Usa la tua classe ApiResponse
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.gestionale.Api.ApiResponse;
import com.example.gestionale.Entity.Dipendente;
import com.example.gestionale.Repository.DipendenteRepository;

@RestController
@RequestMapping("/api/dipendenti")
@CrossOrigin(origins = "*") // Permette al Frontend di parlare col Backend
public class DipendenteController {

    @Autowired
    private DipendenteRepository dipendenteRepository;

    @GetMapping
    public ApiResponse<List<Dipendente>> getAll() {
        return new ApiResponse<>(200, "Lista dipendenti recuperata", dipendenteRepository.findAll());
    }

    @PostMapping
    public ApiResponse<Dipendente> create(@RequestBody Dipendente dipendente) {
        Dipendente salvato = dipendenteRepository.save(dipendente);
        return new ApiResponse<>(201, "Dipendente assunto con successo", salvato);
    }

    @DeleteMapping("/{id}")
    public ApiResponse<String> delete(@PathVariable Long id) {
        dipendenteRepository.deleteById(id);
        return new ApiResponse<>(200, "Dipendente rimosso", "ID: " + id);
    }

}
