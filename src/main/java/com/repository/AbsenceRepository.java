package com.repository;

import com.domain.Absence;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Absence entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AbsenceRepository extends JpaRepository<Absence, Long> {

    @Query("select absence from Absence absence where absence.user.login = ?#{principal.username}")
    List<Absence> findByUserIsCurrentUser();
}
