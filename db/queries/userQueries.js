const insertUser = () => {
  return `
    INSERT INTO
      users(
        email,
        password,
        organization_name
      )
      VALUES($1, $2, $3)
      RETURNING *
  `;
}

const selectUser = () => {
  return `
    SELECT * FROM users 
    WHERE organization_name=($1)
  `
}


module.exports = {
  insertUser,
  selectUser,
}