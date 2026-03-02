package com.example.gestionale.Service;

import com.example.gestionale.Entity.Prodotto;
import com.example.gestionale.Repository.ProdottoRepository;
import com.example.gestionale.Api.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ProdottoService {

    @Autowired
    private ProdottoRepository prodottoRepository;

    public ApiResponse<List<Prodotto>> getTutti() {
        return new ApiResponse<>(200, "Lista recuperata", prodottoRepository.findAll());
    }

    public ApiResponse<Prodotto> getPerId(Long id) {
        Optional<Prodotto> p = prodottoRepository.findById(id);
        if (p.isPresent()) {
            return new ApiResponse<>(200, "Trovato", p.get());
        }
        return new ApiResponse<>(404, "Non trovato", null);
    }

    public ApiResponse<Prodotto> crea(Prodotto p) {
        return new ApiResponse<>(201, "Creato", prodottoRepository.save(p));
    }

    // --- ECCO IL METODO 
    public ApiResponse<Prodotto> aggiorna(Long id, Prodotto nuovoDato) {
        // Verifichiamo se il prodotto esiste prima di aggiornare
        if (!prodottoRepository.existsById(id)) {
            return new ApiResponse<>(404, "Prodotto non trovato con ID: " + id, null);
        }
        
    
        nuovoDato.setId(id);
        
        
        Prodotto salvato = prodottoRepository.save(nuovoDato);
        
        return new ApiResponse<>(200, "Prodotto aggiornato correttamente", salvato);
    }

    public ApiResponse<String> elimina(Long id) {
        if (!prodottoRepository.existsById(id)) {
            return new ApiResponse<>(404, "Impossibile eliminare: ID non trovato", "ID: " + id);
        }
        prodottoRepository.deleteById(id);
        return new ApiResponse<>(200, "Eliminato con successo", "ID: " + id);
    }
}