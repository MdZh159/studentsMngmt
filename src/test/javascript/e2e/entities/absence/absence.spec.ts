import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AbsenceComponentsPage, AbsenceDeleteDialog, AbsenceUpdatePage } from './absence.page-object';

const expect = chai.expect;

describe('Absence e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let absenceComponentsPage: AbsenceComponentsPage;
  let absenceUpdatePage: AbsenceUpdatePage;
  let absenceDeleteDialog: AbsenceDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Absences', async () => {
    await navBarPage.goToEntity('absence');
    absenceComponentsPage = new AbsenceComponentsPage();
    await browser.wait(ec.visibilityOf(absenceComponentsPage.title), 5000);
    expect(await absenceComponentsPage.getTitle()).to.eq('studentsMngmtApp.absence.home.title');
    await browser.wait(ec.or(ec.visibilityOf(absenceComponentsPage.entities), ec.visibilityOf(absenceComponentsPage.noResult)), 1000);
  });

  it('should load create Absence page', async () => {
    await absenceComponentsPage.clickOnCreateButton();
    absenceUpdatePage = new AbsenceUpdatePage();
    expect(await absenceUpdatePage.getPageTitle()).to.eq('studentsMngmtApp.absence.home.createOrEditLabel');
    await absenceUpdatePage.cancel();
  });

  it('should create and save Absences', async () => {
    const nbButtonsBeforeCreate = await absenceComponentsPage.countDeleteButtons();

    await absenceComponentsPage.clickOnCreateButton();

    await promise.all([
      absenceUpdatePage.setDateDebutInput('2000-12-31'),
      absenceUpdatePage.setDateFinInput('2000-12-31'),
      absenceUpdatePage.setJustificationInput('justification'),
      absenceUpdatePage.coursSelectLastOption(),
      absenceUpdatePage.userSelectLastOption(),
    ]);

    expect(await absenceUpdatePage.getDateDebutInput()).to.eq('2000-12-31', 'Expected dateDebut value to be equals to 2000-12-31');
    expect(await absenceUpdatePage.getDateFinInput()).to.eq('2000-12-31', 'Expected dateFin value to be equals to 2000-12-31');
    expect(await absenceUpdatePage.getJustificationInput()).to.eq(
      'justification',
      'Expected Justification value to be equals to justification'
    );

    await absenceUpdatePage.save();
    expect(await absenceUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await absenceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Absence', async () => {
    const nbButtonsBeforeDelete = await absenceComponentsPage.countDeleteButtons();
    await absenceComponentsPage.clickOnLastDeleteButton();

    absenceDeleteDialog = new AbsenceDeleteDialog();
    expect(await absenceDeleteDialog.getDialogTitle()).to.eq('studentsMngmtApp.absence.delete.question');
    await absenceDeleteDialog.clickOnConfirmButton();

    expect(await absenceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
