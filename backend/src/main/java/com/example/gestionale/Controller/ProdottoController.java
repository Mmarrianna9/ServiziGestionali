package com.example.gestionale.Controller;

import com.example.gestionale.Entity.Prodotto;
import com.example.gestionale.Api.ApiResponse;
import com.example.gestionale.Service.ProdottoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/prodotti")
@CrossOrigin(origins = "http://localhost:5173")
public class ProdottoController {

    @Autowired
    private ProdottoService prodottoService;

    @GetMapping
    public ApiResponse<List<Prodotto>> getAll() {
        return prodottoService.getTutti();
    }

    @GetMapping("/{id}")
    public ApiResponse<Prodotto> getById(@PathVariable Long id) {
        return prodottoService.getPerId(id);
    }

    @PostMapping
    public ApiResponse<Prodotto> create(@RequestBody Prodotto prodotto) {
        return prodottoService.crea(prodotto);
    }

    @PutMapping("/{id}")
    public ApiResponse<Prodotto> update(@PathVariable Long id, @RequestBody Prodotto prodotto) {
        // Deleghiamo la logica di aggiornamento al Service
        return prodottoService.aggiorna(id, prodotto);
    }

    @DeleteMapping("/{id}")
    public ApiResponse<String> delete(@PathVariable Long id) {
        return prodottoService.elimina(id);
    }
}