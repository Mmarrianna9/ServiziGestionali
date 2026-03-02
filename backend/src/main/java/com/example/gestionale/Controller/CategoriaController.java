package com.example.gestionale.Controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.gestionale.Api.ApiResponse;
import com.example.gestionale.Entity.Categoria;
import com.example.gestionale.Service.CategoriaService;

@RestController
@RequestMapping("/api/categorie")
@CrossOrigin(origins = "http://localhost:5173") 
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
