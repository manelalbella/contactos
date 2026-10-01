package com.example.contactos.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.contactos.entity.Contacto;

public interface ContactoRepository extends JpaRepository<Contacto, Long> {

    Optional<Contacto> findByEmail(String email);

    boolean existsByEmail(String email);
}