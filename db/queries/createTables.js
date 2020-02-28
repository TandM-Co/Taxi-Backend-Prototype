const createUser = () => {
  return `
    CREATE TABLE IF NOT EXISTS
      users(
        id int GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
        email VARCHAR(128),
        password VARCHAR(128) NOT NULL,
        organization_name VARCHAR(128) NOT NULL UNIQUE
      )
  `;
};

const createLimits = () => {
  return `
    CREATE TABLE IF NOT EXISTS
      limits(
        id int GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
        client_id string,
        total_limit numeric
      )
  `;
};


module.exports = {
  createUserTable: createUser,
  //createLimitsTable: createLimits,
};
