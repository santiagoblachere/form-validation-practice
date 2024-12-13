const { Router } = require('express');
const indexRouter = Router();
const { body, validationResult } = require("express-validator");
const db = require('../db/queries');


indexRouter.get(['/', '/index'], async (req, res) => {
    const messages = await db.getAllMessages()
    console.log(messages)
    res.render('index', {title: "Mini Messageboard", messages : messages})
})
indexRouter.get('/new', (req, res) => {
    res.render('form', {title: "New Message"})
})
indexRouter.get('/message/:id', async (req, res) => {
    const messages = db.getAllMessages()
    const message = (await messages).find(message => message.id == req.params.id)
    res.render('details', {title: "Message Details", message: message})
})
indexRouter.post('/message/:id', async (req, res) => {
    await db.deleteMessage(req.params.id)
    res.redirect('/')
})
indexRouter.post('/new',
  [
      body("text")
          .optional({ values: "falsy" })
          .isLength({ min: 5 })
          .withMessage("Must be at least 5 characters.")
          .escape(),
      body("user")
          .trim()
          .notEmpty()
          .withMessage("Name cannot be empty.")
          .isAlpha()
          .withMessage("Name must only contain alphabet letters.")
          .escape()
  ],
  async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).render('form', { 
              title: "New Message", 
              errors: errors.array() 
          });
      }

      await db.insertMessage(req.body.user, req.body.text )
      res.redirect('/');
  }
);
module.exports = indexRouter;