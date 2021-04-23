let connexion = require("../config/db")
let moment = require('../config/moment')
moment.locale('fr')

class Message{

    constructor(row){
      this.row = row;
    }

    get id(){
      return this.row.id
    }

    get content(){
      return this.row.content
    }

    get created_at(){
      return moment(this.row.created_at)
    }

    static create(content, cb){
      connexion.query('INSERT INTO `message`(`content`, `created_at`) VALUES (?, ?)',[content, new Date()], (err, res) => {
        if(err) throw err
        cb(res)
      })
    }

    static all(cb){
      connexion.query('Select * from message', (err, rows) => {
        if(err) throw err
        cb(rows.map((row) => new Message(row)))
      })
    }

    static find(id, cb){
      connexion.query('Select * from message where id = ? limit 1',[id], (err, rows) => {
        if(err) throw err
        cb(new Message(rows[0]))
      })
    }

    static update(content, id, cb){
      connexion.query('UPDATE message SET content = ?, created_at = ? where id = ?',[content, new Date(), id], (err, rows) => {
        if(err) throw err
        cb(new Message(rows[0]))
      })
    }

    static delete(id, cb){
      connexion.query('delete from message where id = ?',[id], (err, rows) => {
        if(err) throw err
        cb(new Message(rows[0]))
      })
    }
}

module.exports = Message
