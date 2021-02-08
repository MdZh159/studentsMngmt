import { element, by, ElementFinder } from 'protractor';

export class AbsenceComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-absence div table .btn-danger'));
  title = element.all(by.css('jhi-absence div h2#page-heading span')).first();
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

export class AbsenceUpdatePage {
  pageTitle = element(by.id('jhi-absence-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  dateDebutInput = element(by.id('field_dateDebut'));
  dateFinInput = element(by.id('field_dateFin'));
  justificationInput = element(by.id('field_justification'));

  coursSelect = element(by.id('field_cours'));
  userSelect = element(by.id('field_user'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
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

  async setJustificationInput(justification: string): Promise<void> {
    await this.justificationInput.sendKeys(justification);
  }

  async getJustificationInput(): Promise<string> {
    return await this.justificationInput.getAttribute('value');
  }

  async coursSelectLastOption(): Promise<void> {
    await this.coursSelect.all(by.tagName('option')).last().click();
  }

  async coursSelectOption(option: string): Promise<void> {
    await this.coursSelect.sendKeys(option);
  }

  getCoursSelect(): ElementFinder {
    return this.coursSelect;
  }

  async getCoursSelectedOption(): Promise<string> {
    return await this.coursSelect.element(by.css('option:checked')).getText();
  }

  async userSelectLastOption(): Promise<void> {
    await this.userSelect.all(by.tagName('option')).last().click();
  }

  async userSelectOption(option: string): Promise<void> {
    await this.userSelect.sendKeys(option);
  }

  getUserSelect(): ElementFinder {
    return this.userSelect;
  }

  async getUserSelectedOption(): Promise<string> {
    return await this.userSelect.element(by.css('option:checked')).getText();
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

export class AbsenceDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-absence-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-absence'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
