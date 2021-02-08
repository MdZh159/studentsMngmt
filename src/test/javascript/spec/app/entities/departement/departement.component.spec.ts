import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { StudentsMngmtTestModule } from '../../../test.module';
import { DepartementComponent } from 'app/entities/departement/departement.component';
import { DepartementService } from 'app/entities/departement/departement.service';
import { Departement } from 'app/shared/model/departement.model';

describe('Component Tests', () => {
  describe('Departement Management Component', () => {
    let comp: DepartementComponent;
    let fixture: ComponentFixture<DepartementComponent>;
    let service: DepartementService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [StudentsMngmtTestModule],
        declarations: [DepartementComponent],
      })
        .overrideTemplate(DepartementComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DepartementComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DepartementService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Departement(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.departements && comp.departements[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
