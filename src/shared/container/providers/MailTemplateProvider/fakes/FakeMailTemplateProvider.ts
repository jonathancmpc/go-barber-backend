import IMailtemplateProvider from '../models/IMailTemplateProvider';

class FakeMailTemplateProvider implements IMailtemplateProvider {
  public async parse(): Promise<string> {
    return 'Mail content';
  }
}

export default FakeMailTemplateProvider;
