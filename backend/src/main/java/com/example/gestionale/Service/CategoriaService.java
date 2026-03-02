package com.example.gestionale.Service;
import com.example.gestionale.Entity.Categoria;
import com.example.gestionale.Repository.CategoriaRepository;
import com.example.gestionale.Api.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriaService {

    @Autowired
    private CategoriaRepository categoriaRepository;

    // Recupera tutte le categorie
    public ApiResponse<List<Categoria>> getTutte() {
        List<Categoria> lista = categoriaRepository.findAll();
        return new ApiResponse<>(200, "Categorie recuperate con successo", lista);
    }

    // Salva una nuova categoria
    public ApiResponse<Categoria> salva(Categoria categoria) {
        try {
            Categoria salvata = categoriaRepository.save(categoria);
            return new ApiResponse<>(201, "Categoria creata con successo", salvata);
        } catch (Exception e) {
            return new ApiResponse<>(400, "Errore durante il salvataggio: " + e.getMessage(), null);
        }
    }


}
