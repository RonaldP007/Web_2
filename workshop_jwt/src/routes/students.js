const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../database.js');

// GET all 
router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM student', (err, rows, fields) => {
      if(!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    });  
  });
  
  // GET id
  router.get('/:id', (req, res) => {
  const { id } = req.params; 
    mysqlConnection.query('SELECT * FROM student WHERE id = ?', [id], (err, rows, fields) => {
      if (!err) {
        res.json(rows[0]);
      } else {
        console.log(err);
      }
    });
  });
  
  // INSERT
  router.post('/', (req, res) => {
    const {id, firstname, lastname, email, address} = req.body;
    console.log(req.body);
    const query = `
      CALL studentAddOrEdit(?,?,?,?,?);
    `;
    mysqlConnection.query(query, [id, firstname, lastname, email, address], (err, rows, fields) => {
      if(!err) {
        res.json({Status: 'Student Saved'});
      } else {
        console.log(err);
      }
    });
  
  });
  
  //Update
  router.put('/:id', (req, res) => {
    const { firstname, lastname, email, address } = req.body;
    const { id } = req.params;
    const query = `
      CALL studentAddOrEdit(?,?,?,?,?);
    `;
    mysqlConnection.query(query, [id,firstname, lastname, email, address], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Student Updated'});
      } else {
        console.log(err);
      }
    });
  });

  // DELETE
  router.delete('/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('DELETE FROM student WHERE id = ?', [id], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Student Deleted'});
      } else {
        console.log(err);
      }
    });
  });

module.exports = router;