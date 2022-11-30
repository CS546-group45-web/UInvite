const MongoClient = require('mongodb').MongoClient;

let _connection = undefined;
let _db = undefined;

module.exports = {
  dbConnection: async () => {
    if (!_connection) {
      _connection = await MongoClient.connect(process.env.DATABASE_URL);
      _db = await _connection.db(process.env.DATABASE_NAME);
    }

    return _db;
  },
  closeConnection: () => {
    _connection.close();
  },
};
