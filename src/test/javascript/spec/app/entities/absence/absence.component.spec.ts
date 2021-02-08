import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { StudentsMngmtTestModule } from '../../../test.module';
import { AbsenceComponent } from 'app/entities/absence/absence.component';
import { AbsenceService } from 'app/entities/absence/absence.service';
import { Absence } from 'app/shared/model/absence.model';

describe('Component Tests', () => {
  describe('Absence Management Component', () => {
    let comp: AbsenceComponent;
    let fixture: ComponentFixture<AbsenceComponent>;
    let service: AbsenceService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [StudentsMngmtTestModule],
        declarations: [AbsenceComponent],
      })
        .overrideTemplate(AbsenceComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AbsenceComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AbsenceService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Absence(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.absences && comp.absences[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
