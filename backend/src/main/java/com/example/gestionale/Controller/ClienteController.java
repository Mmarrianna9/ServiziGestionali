package com.example.gestionale.Controller;

import com.example.gestionale.Entity.Cliente;
import com.example.gestionale.Repository.ClienteRepository;
import com.example.gestionale.Api.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/clienti")
@CrossOrigin(origins = "*")
public class ClienteController {

    @Autowired
    private ClienteRepository clienteRepository;

    @GetMapping
    public ApiResponse<List<Cliente>> getAll() {
        return new ApiResponse<>(200, "Lista clienti recuperata", clienteRepository.findAll());
    }

    @PostMapping
    public ApiResponse<Cliente> create(@RequestBody Cliente cliente) {
        return new ApiResponse<>(201, "Cliente registrato", clienteRepository.save(cliente));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<String> delete(@PathVariable Long id) {
        clienteRepository.deleteById(id);
        return new ApiResponse<>(200, "Cliente eliminato", "ID: " + id);
    }
}


