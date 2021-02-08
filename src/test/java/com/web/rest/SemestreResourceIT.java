package com.web.rest;

import com.StudentsMngmtApp;
import com.domain.Semestre;
import com.repository.SemestreRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link SemestreResource} REST controller.
 */
@SpringBootTest(classes = StudentsMngmtApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class SemestreResourceIT {

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_DEBUT = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_DEBUT = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_DATE_FIN = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_FIN = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private SemestreRepository semestreRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSemestreMockMvc;

    private Semestre semestre;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Semestre createEntity(EntityManager em) {
        Semestre semestre = new Semestre()
            .nom(DEFAULT_NOM)
            .dateDebut(DEFAULT_DATE_DEBUT)
            .dateFin(DEFAULT_DATE_FIN);
        return semestre;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Semestre createUpdatedEntity(EntityManager em) {
        Semestre semestre = new Semestre()
            .nom(UPDATED_NOM)
            .dateDebut(UPDATED_DATE_DEBUT)
            .dateFin(UPDATED_DATE_FIN);
        return semestre;
    }

    @BeforeEach
    public void initTest() {
        semestre = createEntity(em);
    }

    @Test
    @Transactional
    public void createSemestre() throws Exception {
        int databaseSizeBeforeCreate = semestreRepository.findAll().size();
        // Create the Semestre
        restSemestreMockMvc.perform(post("/api/semestres")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(semestre)))
            .andExpect(status().isCreated());

        // Validate the Semestre in the database
        List<Semestre> semestreList = semestreRepository.findAll();
        assertThat(semestreList).hasSize(databaseSizeBeforeCreate + 1);
        Semestre testSemestre = semestreList.get(semestreList.size() - 1);
        assertThat(testSemestre.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testSemestre.getDateDebut()).isEqualTo(DEFAULT_DATE_DEBUT);
        assertThat(testSemestre.getDateFin()).isEqualTo(DEFAULT_DATE_FIN);
    }

    @Test
    @Transactional
    public void createSemestreWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = semestreRepository.findAll().size();

        // Create the Semestre with an existing ID
        semestre.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSemestreMockMvc.perform(post("/api/semestres")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(semestre)))
            .andExpect(status().isBadRequest());

        // Validate the Semestre in the database
        List<Semestre> semestreList = semestreRepository.findAll();
        assertThat(semestreList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllSemestres() throws Exception {
        // Initialize the database
        semestreRepository.saveAndFlush(semestre);

        // Get all the semestreList
        restSemestreMockMvc.perform(get("/api/semestres?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(semestre.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM)))
            .andExpect(jsonPath("$.[*].dateDebut").value(hasItem(DEFAULT_DATE_DEBUT.toString())))
            .andExpect(jsonPath("$.[*].dateFin").value(hasItem(DEFAULT_DATE_FIN.toString())));
    }
    
    @Test
    @Transactional
    public void getSemestre() throws Exception {
        // Initialize the database
        semestreRepository.saveAndFlush(semestre);

        // Get the semestre
        restSemestreMockMvc.perform(get("/api/semestres/{id}", semestre.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(semestre.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM))
            .andExpect(jsonPath("$.dateDebut").value(DEFAULT_DATE_DEBUT.toString()))
            .andExpect(jsonPath("$.dateFin").value(DEFAULT_DATE_FIN.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingSemestre() throws Exception {
        // Get the semestre
        restSemestreMockMvc.perform(get("/api/semestres/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSemestre() throws Exception {
        // Initialize the database
        semestreRepository.saveAndFlush(semestre);

        int databaseSizeBeforeUpdate = semestreRepository.findAll().size();

        // Update the semestre
        Semestre updatedSemestre = semestreRepository.findById(semestre.getId()).get();
        // Disconnect from session so that the updates on updatedSemestre are not directly saved in db
        em.detach(updatedSemestre);
        updatedSemestre
            .nom(UPDATED_NOM)
            .dateDebut(UPDATED_DATE_DEBUT)
            .dateFin(UPDATED_DATE_FIN);

        restSemestreMockMvc.perform(put("/api/semestres")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedSemestre)))
            .andExpect(status().isOk());

        // Validate the Semestre in the database
        List<Semestre> semestreList = semestreRepository.findAll();
        assertThat(semestreList).hasSize(databaseSizeBeforeUpdate);
        Semestre testSemestre = semestreList.get(semestreList.size() - 1);
        assertThat(testSemestre.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testSemestre.getDateDebut()).isEqualTo(UPDATED_DATE_DEBUT);
        assertThat(testSemestre.getDateFin()).isEqualTo(UPDATED_DATE_FIN);
    }

    @Test
    @Transactional
    public void updateNonExistingSemestre() throws Exception {
        int databaseSizeBeforeUpdate = semestreRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSemestreMockMvc.perform(put("/api/semestres")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(semestre)))
            .andExpect(status().isBadRequest());

        // Validate the Semestre in the database
        List<Semestre> semestreList = semestreRepository.findAll();
        assertThat(semestreList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSemestre() throws Exception {
        // Initialize the database
        semestreRepository.saveAndFlush(semestre);

        int databaseSizeBeforeDelete = semestreRepository.findAll().size();

        // Delete the semestre
        restSemestreMockMvc.perform(delete("/api/semestres/{id}", semestre.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Semestre> semestreList = semestreRepository.findAll();
        assertThat(semestreList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
