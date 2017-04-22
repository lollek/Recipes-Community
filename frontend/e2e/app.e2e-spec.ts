import { FrontendTestPage } from './app.po';

describe('frontend-test App', () => {
  let page: FrontendTestPage;

  beforeEach(() => {
    page = new FrontendTestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
