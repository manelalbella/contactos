package com.example.contactos.service;

import java.util.List;

import com.example.contactos.entity.Contacto;

public interface ContactoService {

    Contacto crear(Contacto contacto);

    List<Contacto> obtenerTodos();

    Contacto obtenerPorId(Long id);

    Contacto actualizar(Long id, Contacto contacto);

    void eliminar(Long id);
}