import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { StudentsMngmtTestModule } from '../../../test.module';
import { AbsenceDetailComponent } from 'app/entities/absence/absence-detail.component';
import { Absence } from 'app/shared/model/absence.model';

describe('Component Tests', () => {
  describe('Absence Management Detail Component', () => {
    let comp: AbsenceDetailComponent;
    let fixture: ComponentFixture<AbsenceDetailComponent>;
    const route = ({ data: of({ absence: new Absence(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [StudentsMngmtTestModule],
        declarations: [AbsenceDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(AbsenceDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AbsenceDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load absence on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.absence).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
