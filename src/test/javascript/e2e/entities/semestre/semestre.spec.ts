import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { SemestreComponentsPage, SemestreDeleteDialog, SemestreUpdatePage } from './semestre.page-object';

const expect = chai.expect;

describe('Semestre e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let semestreComponentsPage: SemestreComponentsPage;
  let semestreUpdatePage: SemestreUpdatePage;
  let semestreDeleteDialog: SemestreDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Semestres', async () => {
    await navBarPage.goToEntity('semestre');
    semestreComponentsPage = new SemestreComponentsPage();
    await browser.wait(ec.visibilityOf(semestreComponentsPage.title), 5000);
    expect(await semestreComponentsPage.getTitle()).to.eq('studentsMngmtApp.semestre.home.title');
    await browser.wait(ec.or(ec.visibilityOf(semestreComponentsPage.entities), ec.visibilityOf(semestreComponentsPage.noResult)), 1000);
  });

  it('should load create Semestre page', async () => {
    await semestreComponentsPage.clickOnCreateButton();
    semestreUpdatePage = new SemestreUpdatePage();
    expect(await semestreUpdatePage.getPageTitle()).to.eq('studentsMngmtApp.semestre.home.createOrEditLabel');
    await semestreUpdatePage.cancel();
  });

  it('should create and save Semestres', async () => {
    const nbButtonsBeforeCreate = await semestreComponentsPage.countDeleteButtons();

    await semestreComponentsPage.clickOnCreateButton();

    await promise.all([
      semestreUpdatePage.setNomInput('nom'),
      semestreUpdatePage.setDateDebutInput('2000-12-31'),
      semestreUpdatePage.setDateFinInput('2000-12-31'),
    ]);

    expect(await semestreUpdatePage.getNomInput()).to.eq('nom', 'Expected Nom value to be equals to nom');
    expect(await semestreUpdatePage.getDateDebutInput()).to.eq('2000-12-31', 'Expected dateDebut value to be equals to 2000-12-31');
    expect(await semestreUpdatePage.getDateFinInput()).to.eq('2000-12-31', 'Expected dateFin value to be equals to 2000-12-31');

    await semestreUpdatePage.save();
    expect(await semestreUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await semestreComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Semestre', async () => {
    const nbButtonsBeforeDelete = await semestreComponentsPage.countDeleteButtons();
    await semestreComponentsPage.clickOnLastDeleteButton();

    semestreDeleteDialog = new SemestreDeleteDialog();
    expect(await semestreDeleteDialog.getDialogTitle()).to.eq('studentsMngmtApp.semestre.delete.question');
    await semestreDeleteDialog.clickOnConfirmButton();

    expect(await semestreComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
