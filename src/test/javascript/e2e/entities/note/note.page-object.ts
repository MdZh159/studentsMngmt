import { element, by, ElementFinder } from 'protractor';

export class NoteComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-note div table .btn-danger'));
  title = element.all(by.css('jhi-note div h2#page-heading span')).first();
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

export class NoteUpdatePage {
  pageTitle = element(by.id('jhi-note-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  noteGradeInput = element(by.id('field_noteGrade'));
  remarqueInput = element(by.id('field_remarque'));

  moduleSelect = element(by.id('field_module'));
  userSelect = element(by.id('field_user'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNoteGradeInput(noteGrade: string): Promise<void> {
    await this.noteGradeInput.sendKeys(noteGrade);
  }

  async getNoteGradeInput(): Promise<string> {
    return await this.noteGradeInput.getAttribute('value');
  }

  async setRemarqueInput(remarque: string): Promise<void> {
    await this.remarqueInput.sendKeys(remarque);
  }

  async getRemarqueInput(): Promise<string> {
    return await this.remarqueInput.getAttribute('value');
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

export class NoteDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-note-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-note'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
