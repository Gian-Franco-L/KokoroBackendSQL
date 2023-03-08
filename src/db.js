import { createPool } from "mysql2/promise"

export const pool = createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  port: 3306,
  database: 'pConnect'
})

// export const pool = createPool({
//   host: 'localhost',
//   user: 'u877495965_GianXero',
//   password: 'Orexnaig15',
//   port: 3306,
//   database: 'u877495965_kokoro'
// })