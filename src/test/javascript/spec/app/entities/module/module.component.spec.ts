import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { StudentsMngmtTestModule } from '../../../test.module';
import { ModuleComponent } from 'app/entities/module/module.component';
import { ModuleService } from 'app/entities/module/module.service';
import { Module } from 'app/shared/model/module.model';

describe('Component Tests', () => {
  describe('Module Management Component', () => {
    let comp: ModuleComponent;
    let fixture: ComponentFixture<ModuleComponent>;
    let service: ModuleService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [StudentsMngmtTestModule],
        declarations: [ModuleComponent],
      })
        .overrideTemplate(ModuleComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ModuleComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ModuleService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Module(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.modules && comp.modules[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
