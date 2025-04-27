let mysql = require("mysql2")
require("dotenv").config()

let db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS
})

let adb = db.promise()

async function getUsers() {
    try {
        let [users, fiellds] = await adb.query("SELECT * FROM user")
        return users
    } catch (err) {
        throw err.message
    }
}

async function addMessage(content, auhtor_id) {
    try {
        let [users, fiellds] = await adb.query("insert into message(contrnt, auhtor_id) values(?, ?)", [content, auhtor_id])
        return users
    } catch (err) {
        throw err.message
    }
}

async function getMessages() {
    try {
        let [users, fiellds] = await adb.query(`SELECT m.id, m.content, a.id from message ON m JOIN `)
        return users
    } catch (err) {
        throw err.message
    }
}


module.exports = {
    getUsers
}