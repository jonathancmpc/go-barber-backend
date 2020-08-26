import IStorageProvider from '../models/IStorageProvider';

class FakeStorageProvider implements IStorageProvider {
  private storage: string[] = [];

  // Método para pegar o arquivo da tmp e colocar na pasta uploads, que está simulando o Amazon S3 ou outros. Ou seja, quando o arquivo estiver pronto, tiramos da pasta tmp e subimos para o local efetivo.
  public async saveFile(file: string): Promise<string> {
    this.storage.push(file);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const findIndex = this.storage.findIndex(
      storageFile => storageFile === file,
    );

    this.storage.splice(findIndex, 1);
  }
}

export default FakeStorageProvider;
