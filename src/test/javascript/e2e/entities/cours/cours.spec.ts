import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CoursComponentsPage, CoursDeleteDialog, CoursUpdatePage } from './cours.page-object';

const expect = chai.expect;

describe('Cours e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let coursComponentsPage: CoursComponentsPage;
  let coursUpdatePage: CoursUpdatePage;
  let coursDeleteDialog: CoursDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Cours', async () => {
    await navBarPage.goToEntity('cours');
    coursComponentsPage = new CoursComponentsPage();
    await browser.wait(ec.visibilityOf(coursComponentsPage.title), 5000);
    expect(await coursComponentsPage.getTitle()).to.eq('studentsMngmtApp.cours.home.title');
    await browser.wait(ec.or(ec.visibilityOf(coursComponentsPage.entities), ec.visibilityOf(coursComponentsPage.noResult)), 1000);
  });

  it('should load create Cours page', async () => {
    await coursComponentsPage.clickOnCreateButton();
    coursUpdatePage = new CoursUpdatePage();
    expect(await coursUpdatePage.getPageTitle()).to.eq('studentsMngmtApp.cours.home.createOrEditLabel');
    await coursUpdatePage.cancel();
  });

  it('should create and save Cours', async () => {
    const nbButtonsBeforeCreate = await coursComponentsPage.countDeleteButtons();

    await coursComponentsPage.clickOnCreateButton();

    await promise.all([
      coursUpdatePage.setNomInput('nom'),
      coursUpdatePage.setDescriptionInput('description'),
      coursUpdatePage.setNbHeuresInput('5'),
      coursUpdatePage.setDateDebutInput('2000-12-31'),
      coursUpdatePage.setDateFinInput('2000-12-31'),
      coursUpdatePage.moduleSelectLastOption(),
    ]);

    expect(await coursUpdatePage.getNomInput()).to.eq('nom', 'Expected Nom value to be equals to nom');
    expect(await coursUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');
    expect(await coursUpdatePage.getNbHeuresInput()).to.eq('5', 'Expected nbHeures value to be equals to 5');
    expect(await coursUpdatePage.getDateDebutInput()).to.eq('2000-12-31', 'Expected dateDebut value to be equals to 2000-12-31');
    expect(await coursUpdatePage.getDateFinInput()).to.eq('2000-12-31', 'Expected dateFin value to be equals to 2000-12-31');

    await coursUpdatePage.save();
    expect(await coursUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await coursComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Cours', async () => {
    const nbButtonsBeforeDelete = await coursComponentsPage.countDeleteButtons();
    await coursComponentsPage.clickOnLastDeleteButton();

    coursDeleteDialog = new CoursDeleteDialog();
    expect(await coursDeleteDialog.getDialogTitle()).to.eq('studentsMngmtApp.cours.delete.question');
    await coursDeleteDialog.clickOnConfirmButton();

    expect(await coursComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
