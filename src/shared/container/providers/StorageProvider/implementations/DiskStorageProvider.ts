import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';
import IStorageProvider from '../models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
  // Método para pegar o arquivo da tmp e colocar na pasta uploads, que está simulando o Amazon S3 ou outros. Ou seja, quando o arquivo estiver pronto, tiramos da pasta tmp e subimos para o local efetivo.
  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, file),
      path.resolve(uploadConfig.uploadsFolder, file),
    );

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadsFolder, file);

    // Verificando se o arquivo existe se não para a execução.
    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }
    // Deletando o arquivo
    await fs.promises.unlink(filePath);
  }
}

export default DiskStorageProvider;
