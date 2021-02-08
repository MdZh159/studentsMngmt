import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ModuleComponentsPage, ModuleDeleteDialog, ModuleUpdatePage } from './module.page-object';

const expect = chai.expect;

describe('Module e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let moduleComponentsPage: ModuleComponentsPage;
  let moduleUpdatePage: ModuleUpdatePage;
  let moduleDeleteDialog: ModuleDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Modules', async () => {
    await navBarPage.goToEntity('module');
    moduleComponentsPage = new ModuleComponentsPage();
    await browser.wait(ec.visibilityOf(moduleComponentsPage.title), 5000);
    expect(await moduleComponentsPage.getTitle()).to.eq('studentsMngmtApp.module.home.title');
    await browser.wait(ec.or(ec.visibilityOf(moduleComponentsPage.entities), ec.visibilityOf(moduleComponentsPage.noResult)), 1000);
  });

  it('should load create Module page', async () => {
    await moduleComponentsPage.clickOnCreateButton();
    moduleUpdatePage = new ModuleUpdatePage();
    expect(await moduleUpdatePage.getPageTitle()).to.eq('studentsMngmtApp.module.home.createOrEditLabel');
    await moduleUpdatePage.cancel();
  });

  it('should create and save Modules', async () => {
    const nbButtonsBeforeCreate = await moduleComponentsPage.countDeleteButtons();

    await moduleComponentsPage.clickOnCreateButton();

    await promise.all([
      moduleUpdatePage.setNomInput('nom'),
      moduleUpdatePage.setPrefixeInput('prefixe'),
      moduleUpdatePage.setDescriptionInput('description'),
      moduleUpdatePage.setDateDebutInput('2000-12-31'),
      moduleUpdatePage.setDateFinInput('2000-12-31'),
      moduleUpdatePage.filiereSelectLastOption(),
      moduleUpdatePage.semestreSelectLastOption(),
    ]);

    expect(await moduleUpdatePage.getNomInput()).to.eq('nom', 'Expected Nom value to be equals to nom');
    expect(await moduleUpdatePage.getPrefixeInput()).to.eq('prefixe', 'Expected Prefixe value to be equals to prefixe');
    expect(await moduleUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');
    expect(await moduleUpdatePage.getDateDebutInput()).to.eq('2000-12-31', 'Expected dateDebut value to be equals to 2000-12-31');
    expect(await moduleUpdatePage.getDateFinInput()).to.eq('2000-12-31', 'Expected dateFin value to be equals to 2000-12-31');

    await moduleUpdatePage.save();
    expect(await moduleUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await moduleComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Module', async () => {
    const nbButtonsBeforeDelete = await moduleComponentsPage.countDeleteButtons();
    await moduleComponentsPage.clickOnLastDeleteButton();

    moduleDeleteDialog = new ModuleDeleteDialog();
    expect(await moduleDeleteDialog.getDialogTitle()).to.eq('studentsMngmtApp.module.delete.question');
    await moduleDeleteDialog.clickOnConfirmButton();

    expect(await moduleComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
