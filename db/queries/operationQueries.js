const inserOperation = () => {
  return `
    INSERT INTO
      operations(
        client_id,
        partner_id,
        oper_type,
        oper_status,
        req_time,
        fault_sum
      )
    VALUES($1, $2, $3, $4, $5, $6)
    RETURNING *
  `;
};
  
  
  
module.exports = {
  inserOperation,
};
