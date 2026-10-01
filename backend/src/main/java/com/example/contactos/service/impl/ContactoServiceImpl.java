package com.example.contactos.service.impl;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.contactos.entity.Contacto;
import com.example.contactos.repository.ContactoRepository;
import com.example.contactos.service.ContactoService;

@Service
public class ContactoServiceImpl implements ContactoService {

    private final ContactoRepository contactoRepository;

    public ContactoServiceImpl(ContactoRepository contactoRepository) {
        this.contactoRepository = contactoRepository;
    }

    @Override
    public Contacto crear(Contacto contacto) {

        if (contactoRepository.existsByEmail(contacto.getEmail())) {
            throw new ResponseStatusException(
                HttpStatus.CONFLICT,
                "El correo electrónico ya está registrado"
            );
        }

        return contactoRepository.save(contacto);
    }

    @Override
    public List<Contacto> obtenerTodos() {
        return contactoRepository.findAll();
    }

    @Override
    public Contacto obtenerPorId(Long id) {
        return contactoRepository.findById(id)
                .orElse(null);
    }

    @Override
    public Contacto actualizar(Long id, Contacto contacto) {

        Contacto existente = contactoRepository.findById(id)
                .orElse(null);

        if (existente == null) {
            return null;
        }

        existente.setNombre(contacto.getNombre());
        existente.setApellido(contacto.getApellido());
        existente.setTelefono(contacto.getTelefono());
        existente.setEmail(contacto.getEmail());
        existente.setDireccion(contacto.getDireccion());
        existente.setCategoria(contacto.getCategoria());

        return contactoRepository.save(existente);
    }

    @Override
    public void eliminar(Long id) {
        contactoRepository.deleteById(id);
    }
}