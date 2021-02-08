import { element, by, ElementFinder } from 'protractor';

export class UserInfoComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-user-info div table .btn-danger'));
  title = element.all(by.css('jhi-user-info div h2#page-heading span')).first();
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

export class UserInfoUpdatePage {
  pageTitle = element(by.id('jhi-user-info-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  phoneInput = element(by.id('field_phone'));
  adresseInput = element(by.id('field_adresse'));
  villeInput = element(by.id('field_ville'));
  ageInput = element(by.id('field_age'));
  fonctionInput = element(by.id('field_fonction'));

  userSelect = element(by.id('field_user'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setPhoneInput(phone: string): Promise<void> {
    await this.phoneInput.sendKeys(phone);
  }

  async getPhoneInput(): Promise<string> {
    return await this.phoneInput.getAttribute('value');
  }

  async setAdresseInput(adresse: string): Promise<void> {
    await this.adresseInput.sendKeys(adresse);
  }

  async getAdresseInput(): Promise<string> {
    return await this.adresseInput.getAttribute('value');
  }

  async setVilleInput(ville: string): Promise<void> {
    await this.villeInput.sendKeys(ville);
  }

  async getVilleInput(): Promise<string> {
    return await this.villeInput.getAttribute('value');
  }

  async setAgeInput(age: string): Promise<void> {
    await this.ageInput.sendKeys(age);
  }

  async getAgeInput(): Promise<string> {
    return await this.ageInput.getAttribute('value');
  }

  async setFonctionInput(fonction: string): Promise<void> {
    await this.fonctionInput.sendKeys(fonction);
  }

  async getFonctionInput(): Promise<string> {
    return await this.fonctionInput.getAttribute('value');
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

export class UserInfoDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-userInfo-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-userInfo'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
