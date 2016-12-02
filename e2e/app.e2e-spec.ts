import { FirewebPage } from './app.po';

describe('fireweb App', function() {
  let page: FirewebPage;

  beforeEach(() => {
    page = new FirewebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
