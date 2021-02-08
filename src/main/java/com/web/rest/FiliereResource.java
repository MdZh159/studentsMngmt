package com.web.rest;

import com.domain.Filiere;
import com.repository.FiliereRepository;
import com.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.domain.Filiere}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class FiliereResource {

    private final Logger log = LoggerFactory.getLogger(FiliereResource.class);

    private static final String ENTITY_NAME = "filiere";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FiliereRepository filiereRepository;

    public FiliereResource(FiliereRepository filiereRepository) {
        this.filiereRepository = filiereRepository;
    }

    /**
     * {@code POST  /filieres} : Create a new filiere.
     *
     * @param filiere the filiere to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new filiere, or with status {@code 400 (Bad Request)} if the filiere has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/filieres")
    public ResponseEntity<Filiere> createFiliere(@RequestBody Filiere filiere) throws URISyntaxException {
        log.debug("REST request to save Filiere : {}", filiere);
        if (filiere.getId() != null) {
            throw new BadRequestAlertException("A new filiere cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Filiere result = filiereRepository.save(filiere);
        return ResponseEntity.created(new URI("/api/filieres/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /filieres} : Updates an existing filiere.
     *
     * @param filiere the filiere to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated filiere,
     * or with status {@code 400 (Bad Request)} if the filiere is not valid,
     * or with status {@code 500 (Internal Server Error)} if the filiere couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/filieres")
    public ResponseEntity<Filiere> updateFiliere(@RequestBody Filiere filiere) throws URISyntaxException {
        log.debug("REST request to update Filiere : {}", filiere);
        if (filiere.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Filiere result = filiereRepository.save(filiere);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, filiere.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /filieres} : get all the filieres.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of filieres in body.
     */
    @GetMapping("/filieres")
    public List<Filiere> getAllFilieres() {
        log.debug("REST request to get all Filieres");
        return filiereRepository.findAll();
    }

    /**
     * {@code GET  /filieres/:id} : get the "id" filiere.
     *
     * @param id the id of the filiere to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the filiere, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/filieres/{id}")
    public ResponseEntity<Filiere> getFiliere(@PathVariable Long id) {
        log.debug("REST request to get Filiere : {}", id);
        Optional<Filiere> filiere = filiereRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(filiere);
    }

    /**
     * {@code DELETE  /filieres/:id} : delete the "id" filiere.
     *
     * @param id the id of the filiere to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/filieres/{id}")
    public ResponseEntity<Void> deleteFiliere(@PathVariable Long id) {
        log.debug("REST request to delete Filiere : {}", id);
        filiereRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
