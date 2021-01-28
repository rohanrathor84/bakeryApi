const query = require("../db/db-connection");
const { multipleColumnSet } = require("../utils/common.utils");
const Role = require("../utils/userRoles.utils");
class UserModel {
  constructor() {
    this.tableName = "user";
  }

  async find(params = {}) {
    let sql = `SELECT * FROM ${this.tableName}`;

    if (!Object.keys(params).length) {
      return await query(sql);
    }

    const { columnSet, values } = multipleColumnSet(params);
    sql += ` WHERE ${columnSet}`;

    return await query(sql, [...values]);
  }

  async findOne(params) {
    const { columnSet, values } = multipleColumnSet(params);

    const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`;

    const result = await query(sql, [...values]);

    // return back the first row (user)
    return result[0];
  }

  async create({
    username,
    password,
    first_name,
    last_name,
    email,
    role = Role.SuperUser,
    age,
  }) {
    const sql = `INSERT INTO ${this.tableName}
        (username, password, first_name, last_name, email, role, age) VALUES (?,?,?,?,?,?,?)`;

    const result = await query(sql, [
      username,
      password,
      first_name,
      last_name,
      email,
      role,
      age,
    ]);
    const affectedRows = result ? result.affectedRows : 0;

    return affectedRows;
  }

  async update(params, id) {
    const { columnSet, values } = multipleColumnSet(params);

    const sql = `UPDATE user SET ${columnSet} WHERE id = ?`;

    const result = await query(sql, [...values, id]);

    return result;
  }

  async delete(id) {
    const sql = `DELETE FROM ${this.tableName}
        WHERE id = ?`;
    const result = await query(sql, [id]);
    const affectedRows = result ? result.affectedRows : 0;

    return affectedRows;
  }
}

module.exports = new UserModel();
