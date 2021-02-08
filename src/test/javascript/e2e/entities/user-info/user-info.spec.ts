import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { UserInfoComponentsPage, UserInfoDeleteDialog, UserInfoUpdatePage } from './user-info.page-object';

const expect = chai.expect;

describe('UserInfo e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let userInfoComponentsPage: UserInfoComponentsPage;
  let userInfoUpdatePage: UserInfoUpdatePage;
  let userInfoDeleteDialog: UserInfoDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load UserInfos', async () => {
    await navBarPage.goToEntity('user-info');
    userInfoComponentsPage = new UserInfoComponentsPage();
    await browser.wait(ec.visibilityOf(userInfoComponentsPage.title), 5000);
    expect(await userInfoComponentsPage.getTitle()).to.eq('studentsMngmtApp.userInfo.home.title');
    await browser.wait(ec.or(ec.visibilityOf(userInfoComponentsPage.entities), ec.visibilityOf(userInfoComponentsPage.noResult)), 1000);
  });

  it('should load create UserInfo page', async () => {
    await userInfoComponentsPage.clickOnCreateButton();
    userInfoUpdatePage = new UserInfoUpdatePage();
    expect(await userInfoUpdatePage.getPageTitle()).to.eq('studentsMngmtApp.userInfo.home.createOrEditLabel');
    await userInfoUpdatePage.cancel();
  });

  it('should create and save UserInfos', async () => {
    const nbButtonsBeforeCreate = await userInfoComponentsPage.countDeleteButtons();

    await userInfoComponentsPage.clickOnCreateButton();

    await promise.all([
      userInfoUpdatePage.setPhoneInput('phone'),
      userInfoUpdatePage.setAdresseInput('adresse'),
      userInfoUpdatePage.setVilleInput('ville'),
      userInfoUpdatePage.setAgeInput('5'),
      userInfoUpdatePage.setFonctionInput('fonction'),
      userInfoUpdatePage.userSelectLastOption(),
    ]);

    expect(await userInfoUpdatePage.getPhoneInput()).to.eq('phone', 'Expected Phone value to be equals to phone');
    expect(await userInfoUpdatePage.getAdresseInput()).to.eq('adresse', 'Expected Adresse value to be equals to adresse');
    expect(await userInfoUpdatePage.getVilleInput()).to.eq('ville', 'Expected Ville value to be equals to ville');
    expect(await userInfoUpdatePage.getAgeInput()).to.eq('5', 'Expected age value to be equals to 5');
    expect(await userInfoUpdatePage.getFonctionInput()).to.eq('fonction', 'Expected Fonction value to be equals to fonction');

    await userInfoUpdatePage.save();
    expect(await userInfoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await userInfoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last UserInfo', async () => {
    const nbButtonsBeforeDelete = await userInfoComponentsPage.countDeleteButtons();
    await userInfoComponentsPage.clickOnLastDeleteButton();

    userInfoDeleteDialog = new UserInfoDeleteDialog();
    expect(await userInfoDeleteDialog.getDialogTitle()).to.eq('studentsMngmtApp.userInfo.delete.question');
    await userInfoDeleteDialog.clickOnConfirmButton();

    expect(await userInfoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
