package com.example.contactos.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.contactos.entity.Contacto;
import com.example.contactos.service.ContactoService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class ContactoController {

    private final ContactoService contactoService;

    public ContactoController(ContactoService contactoService) {
        this.contactoService = contactoService;
    }

    @GetMapping("/contactos")
    public List<Contacto> obtenerContactos() {
        return contactoService.obtenerTodos();
    }

    @GetMapping("/contactos/{id}")
    public Contacto obtenerContacto(@PathVariable Long id) {
        return contactoService.obtenerPorId(id);
    }

    @PostMapping("/contactos")
    public Contacto crearContacto(@RequestBody Contacto contacto) {
        return contactoService.crear(contacto);
    }

    @PutMapping("/contactos/{id}")
    public Contacto actualizarContacto(
            @PathVariable Long id,
            @RequestBody Contacto contacto) {

        return contactoService.actualizar(id, contacto);
    }

    @DeleteMapping("/contactos/{id}")
    public void eliminarContacto(@PathVariable Long id) {
        contactoService.eliminar(id);
    }
}