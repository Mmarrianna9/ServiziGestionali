package com.example.gestionale.Controller;
import com.example.gestionale.Entity.Fornitore;
import com.example.gestionale.Repository.FornitoreRepository;
import com.example.gestionale.Api.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/fornitori")
@CrossOrigin(origins = "*")
public class FornitoreController {

    @Autowired
    private FornitoreRepository fornitoreRepository;

    @GetMapping
    public ApiResponse<List<Fornitore>> getAll() {
        return new ApiResponse<>(200, "Lista fornitori recuperata", fornitoreRepository.findAll());
    }

    @PostMapping
    public ApiResponse<Fornitore> create(@RequestBody Fornitore fornitore) {
        return new ApiResponse<>(201, "Fornitore aggiunto", fornitoreRepository.save(fornitore));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<String> delete(@PathVariable Long id) {
        fornitoreRepository.deleteById(id);
        return new ApiResponse<>(200, "Fornitore rimosso", "ID: " + id);
    }

}
