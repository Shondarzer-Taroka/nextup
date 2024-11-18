// global.d.ts
declare global {
    namespace NodeJS {
      interface Global {
        _mongoClientPromise?: Promise<MongoClient>;
      }
    }
  }
  
  // This is needed to make the file a module
  export {};
  