import { hashSync } from 'bcrypt';
import {
  createCipheriv,
  createDecipheriv,
  randomBytes,
  randomFill,
  scrypt,
} from 'crypto';

// tutorial url: https://medium.com/@bonaventuragal/data-encryption-and-hashing-a-scenario-using-nestjs-prisma-app-902b43530dbb

const algorithm = 'aes-192-cbc';
const keyLenght = 24;

const _encrypt = async (data: string): Promise<string> => {
  const salt = randomBytes(8).toString('hex');

  return new Promise((resolve, reject) => {
    scrypt(
      process.env.ENCRYPTED_PASSWORD as string,
      salt,
      keyLenght,
      (err, key) => {
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
      },
    );
  });
};

const _decrypt = async (encryptedData: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const [salt, ivHex, encrypted] = encryptedData.split('|');

    if (!salt || !ivHex || !encrypted) reject(new Error('Invalid data'));

    const iv = Buffer.from(ivHex, 'hex');

    scrypt(
      process.env.ENCRYPTED_PASSWORD as string,
      salt,
      keyLenght,
      (err, key) => {
        if (err) reject(err);

        const decipher = createDecipheriv(algorithm, key, iv);
        let decrypted = decipher.update(encrypted, 'base64', 'utf8');
        decrypted += decipher.final('utf8');

        resolve(decrypted);
      },
    );
  });
};

export const hash = async (data: string) => {
  return await hashSync(data, process.env.HASH_SALT as string);
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
