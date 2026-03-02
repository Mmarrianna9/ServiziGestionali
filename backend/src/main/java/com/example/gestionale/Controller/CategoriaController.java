package com.example.gestionale.Controller;
import com.example.gestionale.Entity.Categoria;
import com.example.gestionale.Api.ApiResponse;
import com.example.gestionale.Service.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categorie")
@CrossOrigin(origins = "http://localhost:5173") // Porta di default di Vite
public class CategoriaController {

    @Autowired
    private CategoriaService categoriaService;

    @GetMapping
    public ApiResponse<List<Categoria>> getAll() {
        return categoriaService.getTutte();
    }

    @PostMapping
    public ApiResponse<Categoria> create(@RequestBody Categoria categoria) {
        return categoriaService.salva(categoria);
    }

}
