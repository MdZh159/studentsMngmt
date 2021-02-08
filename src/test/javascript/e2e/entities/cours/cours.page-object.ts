import { element, by, ElementFinder } from 'protractor';

export class CoursComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-cours div table .btn-danger'));
  title = element.all(by.css('jhi-cours div h2#page-heading span')).first();
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

export class CoursUpdatePage {
  pageTitle = element(by.id('jhi-cours-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nomInput = element(by.id('field_nom'));
  descriptionInput = element(by.id('field_description'));
  nbHeuresInput = element(by.id('field_nbHeures'));
  dateDebutInput = element(by.id('field_dateDebut'));
  dateFinInput = element(by.id('field_dateFin'));

  moduleSelect = element(by.id('field_module'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNomInput(nom: string): Promise<void> {
    await this.nomInput.sendKeys(nom);
  }

  async getNomInput(): Promise<string> {
    return await this.nomInput.getAttribute('value');
  }

  async setDescriptionInput(description: string): Promise<void> {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput(): Promise<string> {
    return await this.descriptionInput.getAttribute('value');
  }

  async setNbHeuresInput(nbHeures: string): Promise<void> {
    await this.nbHeuresInput.sendKeys(nbHeures);
  }

  async getNbHeuresInput(): Promise<string> {
    return await this.nbHeuresInput.getAttribute('value');
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

  async moduleSelectLastOption(): Promise<void> {
    await this.moduleSelect.all(by.tagName('option')).last().click();
  }

  async moduleSelectOption(option: string): Promise<void> {
    await this.moduleSelect.sendKeys(option);
  }

  getModuleSelect(): ElementFinder {
    return this.moduleSelect;
  }

  async getModuleSelectedOption(): Promise<string> {
    return await this.moduleSelect.element(by.css('option:checked')).getText();
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

export class CoursDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-cours-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-cours'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
