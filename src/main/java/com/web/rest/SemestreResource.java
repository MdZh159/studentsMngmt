package com.web.rest;

import com.domain.Semestre;
import com.repository.SemestreRepository;
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
 * REST controller for managing {@link com.domain.Semestre}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class SemestreResource {

    private final Logger log = LoggerFactory.getLogger(SemestreResource.class);

    private static final String ENTITY_NAME = "semestre";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SemestreRepository semestreRepository;

    public SemestreResource(SemestreRepository semestreRepository) {
        this.semestreRepository = semestreRepository;
    }

    /**
     * {@code POST  /semestres} : Create a new semestre.
     *
     * @param semestre the semestre to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new semestre, or with status {@code 400 (Bad Request)} if the semestre has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/semestres")
    public ResponseEntity<Semestre> createSemestre(@RequestBody Semestre semestre) throws URISyntaxException {
        log.debug("REST request to save Semestre : {}", semestre);
        if (semestre.getId() != null) {
            throw new BadRequestAlertException("A new semestre cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Semestre result = semestreRepository.save(semestre);
        return ResponseEntity.created(new URI("/api/semestres/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /semestres} : Updates an existing semestre.
     *
     * @param semestre the semestre to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated semestre,
     * or with status {@code 400 (Bad Request)} if the semestre is not valid,
     * or with status {@code 500 (Internal Server Error)} if the semestre couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/semestres")
    public ResponseEntity<Semestre> updateSemestre(@RequestBody Semestre semestre) throws URISyntaxException {
        log.debug("REST request to update Semestre : {}", semestre);
        if (semestre.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Semestre result = semestreRepository.save(semestre);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, semestre.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /semestres} : get all the semestres.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of semestres in body.
     */
    @GetMapping("/semestres")
    public List<Semestre> getAllSemestres() {
        log.debug("REST request to get all Semestres");
        return semestreRepository.findAll();
    }

    /**
     * {@code GET  /semestres/:id} : get the "id" semestre.
     *
     * @param id the id of the semestre to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the semestre, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/semestres/{id}")
    public ResponseEntity<Semestre> getSemestre(@PathVariable Long id) {
        log.debug("REST request to get Semestre : {}", id);
        Optional<Semestre> semestre = semestreRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(semestre);
    }

    /**
     * {@code DELETE  /semestres/:id} : delete the "id" semestre.
     *
     * @param id the id of the semestre to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/semestres/{id}")
    public ResponseEntity<Void> deleteSemestre(@PathVariable Long id) {
        log.debug("REST request to delete Semestre : {}", id);
        semestreRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
