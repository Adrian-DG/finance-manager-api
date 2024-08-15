import { hashSync, genSaltSync } from 'bcrypt';
import {
  createCipheriv,
  createDecipheriv,
  randomBytes,
  randomFill,
  scrypt,
} from 'crypto';

const algorithm = 'aes-192-cbc';
const hash_salt = '$2b$10$O0muTE/K847vARdGbh7kbu';
const encrypt_password = '$2b$24$Vgt1hMkTEb7hJgyUZy8j8O';
const keyLenght = 24;

const _encrypt = async (data: string): Promise<string> => {
  const salt = randomBytes(8).toString('hex');

  return new Promise((resolve, reject) => {
    scrypt(encrypt_password as string, salt, keyLenght, (err, key) => {
      if (err) reject(err);
      randomFill(new Uint8Array(16), (err, iv) => {
        const ivHex = Buffer.from(iv).toString('hex');
        if (err) reject(err);

        const cipher = createCipheriv(algorithm, key, iv);
        let encrypted = cipher.update(data, 'utf8', 'base64');
        encrypted += cipher.final('base64');

        const result = `${salt}|${ivHex}|${encrypted}`;
        resolve(result);
      });
    });
  });
};

const _decrypt = async (encryptedData: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const [salt, ivHex, encrypted] = encryptedData.split('|');

    if (!salt || !ivHex || !encrypted) reject(new Error('Invalid data'));

    const iv = Buffer.from(ivHex, 'hex');

    scrypt(encrypt_password, salt, keyLenght, (err, key) => {
      if (err) reject(err);

      const decipher = createDecipheriv(algorithm, key, iv);
      let decrypted = decipher.update(encrypted, 'base64', 'utf8');
      decrypted += decipher.final('utf8');

      resolve(decrypted);
    });
  });
};

export const hash = async (data: string) => {
  return await hashSync(data, hash_salt); // TODO: hash_salt should be obtained from a .env file
};

export const encrypt = async (data: string) => {
  const encrypted = await _encrypt(data);
  const hashed = await hash(data);
  return `${hashed}|${encrypted};`;
};

export const decrypt = async (data: string) => {
  const [_, ...rest] = data.split('|');
  const encrypted = rest.join('|');
  return await _decrypt(encrypted);
};
