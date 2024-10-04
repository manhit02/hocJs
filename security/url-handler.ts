import { logError } from '@/utils/log-helper';
import * as crypto from 'crypto';

function splitEncryptedText(encryptedText: string) {
  return {
    ivString: encryptedText.slice(0, 32),
    encryptedDataString: encryptedText.slice(32),
  };
}
export const encryptClientSide = (plaintext: string) => {
  const encoding: BufferEncoding = 'hex';

  // process.env.CRYPTO_KEY should be a 32 BYTE key
  const key: string = process.env.NEXT_PUBLIC_KeySign || '';
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

  const encrypted = Buffer.concat([
    cipher.update(plaintext, 'utf-8'),
    cipher.final(),
  ]);

  return iv.toString(encoding) + encrypted.toString(encoding);
  // try {

  // } catch (e) {
  //   console.error(e);
  //   return '';
  // }
};
export const decryptClientSide = (plaintext: string) => {
  const { encryptedDataString, ivString } = splitEncryptedText(plaintext);
  const encoding: BufferEncoding = 'hex';
  const key: string = process.env.NEXT_PUBLIC_KeySign || '';
  try {
    const iv = Buffer.from(ivString, encoding);
    const encryptedText = Buffer.from(encryptedDataString, encoding);

    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

    const decrypted = decipher.update(encryptedText);
    return Buffer.concat([decrypted, decipher.final()]).toString();
  } catch (e) {
    console.error(e);
    return '';
  }
};
export default class Security {
  encoding: BufferEncoding = 'base64';

  // process.env.CRYPTO_KEY should be a 16 BYTE key
  key: string = process.env.ImageKeySign || '';

  decrypt(cipherText: string) {
    try {
      const keyBuffer = Buffer.from(this.key, 'utf-8');
      const decipher = crypto.createDecipheriv('aes-128-ecb', keyBuffer, '');
      let decrypted = decipher.update(cipherText, 'base64', 'utf-8');
      decrypted += decipher.final('utf-8');
      return decrypted;
    } catch (error:any) {
      logError("Image decrypt",{cipherText},{error: error.toString()})
      return '';
    }
  }
}
