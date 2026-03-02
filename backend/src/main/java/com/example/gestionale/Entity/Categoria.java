package com.example.gestionale.Entity;
import jakarta.persistence.*;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "categorie")
public class Categoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String nome;

    
    @OneToMany(mappedBy = "categoria", cascade = CascadeType.ALL)
    @JsonIgnore 
    private List<Prodotto> prodotti;

    // Costruttori, Getter e Setter
    public Categoria() {}
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public List<Prodotto> getProdotti() { return prodotti; }
    public void setProdotti(List<Prodotto> prodotti) { this.prodotti = prodotti; }


}
