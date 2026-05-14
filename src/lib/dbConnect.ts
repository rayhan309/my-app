import {
  MongoClient,
  ServerApiVersion,
  MongoClientOptions,
  Collection,
  type Document,
} from "mongodb";
// import dns from "dns";

// // Fix for querySrv ECONNREFUSED issues by using Google DNS
// if (typeof dns.setServers === "function") {
//   dns.setServers(["8.8.8.8", "8.8.4.4"]);
// }

const uri = process.env.MONGO_DB_URI as string;
const dbname = process.env.MONGO_DB_NAME as string;

if (!uri) {
    throw new Error('Please add your Mongo URI to .env');
}

// 1. Set optimized connection options
const options: MongoClientOptions = {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
    maxPoolSize: 10,
    minPoolSize: 5,
    connectTimeoutMS: 10000, // 10 seconds timeout
};

let client: MongoClient;

// Extend the NodeJS Global type to include _mongoClient
declare global {
    // eslint-disable-next-line no-var
    var _mongoClient: MongoClient | undefined;
}

// 2. Connection Caching in Development
// This prevents creating infinite db connection pools on hot reloads
if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClient) {
        global._mongoClient = new MongoClient(uri, options);
    }
    client = global._mongoClient;
} else {
    // In production, keep creating the standard client
    client = new MongoClient(uri, options);
}

// Ensure the client attempts to connect behind the scenes
client.connect().catch((error) => console.error("Global MongoDB Connection Error: ", error));

/**
 * Returns a MongoDB collection from the cached database connection.
 * @param cname The collection name to retrieve.
 */
export const dbConnect = <T extends Document = Document>(
  cname: string
): Collection<T> => {
  return client.db(dbname).collection<T>(cname);
};

export default dbConnect;