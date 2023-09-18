import { promisePool } from "../../database.js";

export const FindById =async (id)=>{
    const [[row]] = await promisePool.query(`SELECT * FROM roles WHERE id='${id}'`);
    if (row) return row;
    return undefined;
}