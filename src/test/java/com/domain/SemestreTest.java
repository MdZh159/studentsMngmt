package com.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.web.rest.TestUtil;

public class SemestreTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Semestre.class);
        Semestre semestre1 = new Semestre();
        semestre1.setId(1L);
        Semestre semestre2 = new Semestre();
        semestre2.setId(semestre1.getId());
        assertThat(semestre1).isEqualTo(semestre2);
        semestre2.setId(2L);
        assertThat(semestre1).isNotEqualTo(semestre2);
        semestre1.setId(null);
        assertThat(semestre1).isNotEqualTo(semestre2);
    }
}
