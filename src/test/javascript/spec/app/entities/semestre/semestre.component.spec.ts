import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { StudentsMngmtTestModule } from '../../../test.module';
import { SemestreComponent } from 'app/entities/semestre/semestre.component';
import { SemestreService } from 'app/entities/semestre/semestre.service';
import { Semestre } from 'app/shared/model/semestre.model';

describe('Component Tests', () => {
  describe('Semestre Management Component', () => {
    let comp: SemestreComponent;
    let fixture: ComponentFixture<SemestreComponent>;
    let service: SemestreService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [StudentsMngmtTestModule],
        declarations: [SemestreComponent],
      })
        .overrideTemplate(SemestreComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SemestreComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SemestreService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Semestre(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.semestres && comp.semestres[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
