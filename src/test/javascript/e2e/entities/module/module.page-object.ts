import { element, by, ElementFinder } from 'protractor';

export class ModuleComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-module div table .btn-danger'));
  title = element.all(by.css('jhi-module div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class ModuleUpdatePage {
  pageTitle = element(by.id('jhi-module-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nomInput = element(by.id('field_nom'));
  prefixeInput = element(by.id('field_prefixe'));
  descriptionInput = element(by.id('field_description'));
  dateDebutInput = element(by.id('field_dateDebut'));
  dateFinInput = element(by.id('field_dateFin'));

  filiereSelect = element(by.id('field_filiere'));
  semestreSelect = element(by.id('field_semestre'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNomInput(nom: string): Promise<void> {
    await this.nomInput.sendKeys(nom);
  }

  async getNomInput(): Promise<string> {
    return await this.nomInput.getAttribute('value');
  }

  async setPrefixeInput(prefixe: string): Promise<void> {
    await this.prefixeInput.sendKeys(prefixe);
  }

  async getPrefixeInput(): Promise<string> {
    return await this.prefixeInput.getAttribute('value');
  }

  async setDescriptionInput(description: string): Promise<void> {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput(): Promise<string> {
    return await this.descriptionInput.getAttribute('value');
  }

  async setDateDebutInput(dateDebut: string): Promise<void> {
    await this.dateDebutInput.sendKeys(dateDebut);
  }

  async getDateDebutInput(): Promise<string> {
    return await this.dateDebutInput.getAttribute('value');
  }

  async setDateFinInput(dateFin: string): Promise<void> {
    await this.dateFinInput.sendKeys(dateFin);
  }

  async getDateFinInput(): Promise<string> {
    return await this.dateFinInput.getAttribute('value');
  }

  async filiereSelectLastOption(): Promise<void> {
    await this.filiereSelect.all(by.tagName('option')).last().click();
  }

  async filiereSelectOption(option: string): Promise<void> {
    await this.filiereSelect.sendKeys(option);
  }

  getFiliereSelect(): ElementFinder {
    return this.filiereSelect;
  }

  async getFiliereSelectedOption(): Promise<string> {
    return await this.filiereSelect.element(by.css('option:checked')).getText();
  }

  async semestreSelectLastOption(): Promise<void> {
    await this.semestreSelect.all(by.tagName('option')).last().click();
  }

  async semestreSelectOption(option: string): Promise<void> {
    await this.semestreSelect.sendKeys(option);
  }

  getSemestreSelect(): ElementFinder {
    return this.semestreSelect;
  }

  async getSemestreSelectedOption(): Promise<string> {
    return await this.semestreSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class ModuleDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-module-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-module'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
