import { element, by, ElementFinder } from 'protractor';

export class FiliereComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-filiere div table .btn-danger'));
  title = element.all(by.css('jhi-filiere div h2#page-heading span')).first();
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

export class FiliereUpdatePage {
  pageTitle = element(by.id('jhi-filiere-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nomInput = element(by.id('field_nom'));
  prefixeInput = element(by.id('field_prefixe'));
  descriptionInput = element(by.id('field_description'));

  departementSelect = element(by.id('field_departement'));

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

  async departementSelectLastOption(): Promise<void> {
    await this.departementSelect.all(by.tagName('option')).last().click();
  }

  async departementSelectOption(option: string): Promise<void> {
    await this.departementSelect.sendKeys(option);
  }

  getDepartementSelect(): ElementFinder {
    return this.departementSelect;
  }

  async getDepartementSelectedOption(): Promise<string> {
    return await this.departementSelect.element(by.css('option:checked')).getText();
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

export class FiliereDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-filiere-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-filiere'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
