import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { StudentsMngmtTestModule } from '../../../test.module';
import { SemestreUpdateComponent } from 'app/entities/semestre/semestre-update.component';
import { SemestreService } from 'app/entities/semestre/semestre.service';
import { Semestre } from 'app/shared/model/semestre.model';

describe('Component Tests', () => {
  describe('Semestre Management Update Component', () => {
    let comp: SemestreUpdateComponent;
    let fixture: ComponentFixture<SemestreUpdateComponent>;
    let service: SemestreService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [StudentsMngmtTestModule],
        declarations: [SemestreUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(SemestreUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SemestreUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SemestreService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Semestre(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Semestre();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
