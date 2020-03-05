const inserClientLimit = () => {
  return `
    INSERT INTO
      clients(
        client_id,
        partner_id,
        total_limit
      )
      VALUES($1, $2, $3)
      RETURNING *
  `;
};

const selectClientLimit = () => {
  return `
      SELECT * 
      FROM clients
      WHERE EXISTS (SELECT * FROM clients WHERE client_id=($1) AND partner_id=($2))
    `
};

const updateClientTotalLimit = () => {
  return `
    UPDATE clients
      SET total_limit=($1)
      WHERE (client_id=($2) AND partner_id=($3))
      RETURNING *
  `;
};
  
  
module.exports = {
  inserClientLimit,
  updateClientTotalLimit,
  selectClientLimit,
};
