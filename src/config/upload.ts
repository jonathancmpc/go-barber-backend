import path from 'path';
import multer from 'multer';
import crypto from 'crypto';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  tmpFolder,
  uploadsFolder: path.resolve(tmpFolder, 'uploads'),
  // Por enquanto vamos salvar os uploads em nossa aplicação, dentro da pasta tmp na raiz do projeto
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(request, file, callback) {
      // Criando um hash para o nome do arquivo, para assegurar que não vai haver arquivos com nomes repetidos. Então utilizamos o crypto passando 10bytes de texto aleatório e transformamos em formato hexadecimal.
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;
      // Seocorrer algum erro no salvamento do arquivo, ele dará o callback
      return callback(null, fileName);
    },
  }),
};
