import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { StudentsMngmtTestModule } from '../../../test.module';
import { CoursDetailComponent } from 'app/entities/cours/cours-detail.component';
import { Cours } from 'app/shared/model/cours.model';

describe('Component Tests', () => {
  describe('Cours Management Detail Component', () => {
    let comp: CoursDetailComponent;
    let fixture: ComponentFixture<CoursDetailComponent>;
    const route = ({ data: of({ cours: new Cours(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [StudentsMngmtTestModule],
        declarations: [CoursDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(CoursDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CoursDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load cours on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.cours).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
