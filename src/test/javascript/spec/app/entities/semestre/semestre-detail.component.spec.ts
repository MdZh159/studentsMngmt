import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { StudentsMngmtTestModule } from '../../../test.module';
import { SemestreDetailComponent } from 'app/entities/semestre/semestre-detail.component';
import { Semestre } from 'app/shared/model/semestre.model';

describe('Component Tests', () => {
  describe('Semestre Management Detail Component', () => {
    let comp: SemestreDetailComponent;
    let fixture: ComponentFixture<SemestreDetailComponent>;
    const route = ({ data: of({ semestre: new Semestre(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [StudentsMngmtTestModule],
        declarations: [SemestreDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(SemestreDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SemestreDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load semestre on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.semestre).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
