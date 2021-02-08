import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { StudentsMngmtTestModule } from '../../../test.module';
import { FiliereComponent } from 'app/entities/filiere/filiere.component';
import { FiliereService } from 'app/entities/filiere/filiere.service';
import { Filiere } from 'app/shared/model/filiere.model';

describe('Component Tests', () => {
  describe('Filiere Management Component', () => {
    let comp: FiliereComponent;
    let fixture: ComponentFixture<FiliereComponent>;
    let service: FiliereService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [StudentsMngmtTestModule],
        declarations: [FiliereComponent],
      })
        .overrideTemplate(FiliereComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FiliereComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FiliereService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Filiere(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.filieres && comp.filieres[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
