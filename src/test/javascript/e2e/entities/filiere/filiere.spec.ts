import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { FiliereComponentsPage, FiliereDeleteDialog, FiliereUpdatePage } from './filiere.page-object';

const expect = chai.expect;

describe('Filiere e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let filiereComponentsPage: FiliereComponentsPage;
  let filiereUpdatePage: FiliereUpdatePage;
  let filiereDeleteDialog: FiliereDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Filieres', async () => {
    await navBarPage.goToEntity('filiere');
    filiereComponentsPage = new FiliereComponentsPage();
    await browser.wait(ec.visibilityOf(filiereComponentsPage.title), 5000);
    expect(await filiereComponentsPage.getTitle()).to.eq('studentsMngmtApp.filiere.home.title');
    await browser.wait(ec.or(ec.visibilityOf(filiereComponentsPage.entities), ec.visibilityOf(filiereComponentsPage.noResult)), 1000);
  });

  it('should load create Filiere page', async () => {
    await filiereComponentsPage.clickOnCreateButton();
    filiereUpdatePage = new FiliereUpdatePage();
    expect(await filiereUpdatePage.getPageTitle()).to.eq('studentsMngmtApp.filiere.home.createOrEditLabel');
    await filiereUpdatePage.cancel();
  });

  it('should create and save Filieres', async () => {
    const nbButtonsBeforeCreate = await filiereComponentsPage.countDeleteButtons();

    await filiereComponentsPage.clickOnCreateButton();

    await promise.all([
      filiereUpdatePage.setNomInput('nom'),
      filiereUpdatePage.setPrefixeInput('prefixe'),
      filiereUpdatePage.setDescriptionInput('description'),
      filiereUpdatePage.departementSelectLastOption(),
    ]);

    expect(await filiereUpdatePage.getNomInput()).to.eq('nom', 'Expected Nom value to be equals to nom');
    expect(await filiereUpdatePage.getPrefixeInput()).to.eq('prefixe', 'Expected Prefixe value to be equals to prefixe');
    expect(await filiereUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');

    await filiereUpdatePage.save();
    expect(await filiereUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await filiereComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Filiere', async () => {
    const nbButtonsBeforeDelete = await filiereComponentsPage.countDeleteButtons();
    await filiereComponentsPage.clickOnLastDeleteButton();

    filiereDeleteDialog = new FiliereDeleteDialog();
    expect(await filiereDeleteDialog.getDialogTitle()).to.eq('studentsMngmtApp.filiere.delete.question');
    await filiereDeleteDialog.clickOnConfirmButton();

    expect(await filiereComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
