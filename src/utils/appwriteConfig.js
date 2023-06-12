import { Client, Account, Databases, Storage, Functions } from 'appwrite';

const client = new Client()
  .setEndpoint(import.meta.env.VITE_API_URL)
  .setProject(import.meta.env.VITE_PROJECT_ID);

const account = new Account(client);
const database = new Databases(client);
const storage = new Storage(client);
const fn = new Functions(client);

const databaseId = import.meta.env.VITE_PROJECT_DATABASE_ID;

export { account, database, storage, fn, databaseId };
