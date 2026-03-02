package com.example.gestionale.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.gestionale.Entity.Prodotto;

public interface ProdottoRepository extends JpaRepository<Prodotto, Long>{

}
