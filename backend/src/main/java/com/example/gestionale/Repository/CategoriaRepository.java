package com.example.gestionale.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.gestionale.Entity.Categoria;

public interface CategoriaRepository  extends JpaRepository<Categoria, Long>{

}
