const { Router } = require('express');
const indexRouter = Router();

const messages = [
    {
      id: 0,
      text: "Hi there!",
      user: "Amando",
      added: new Date()
    },
    {
        id: 1,
      text: "Hello World!",
      user: "Charles",
      added: new Date()
    }
  ];
  

indexRouter.get(['/', '/index'], (req, res) => {
    res.render('index', {title: "Mini Messageboard", messages : messages})
})
indexRouter.get('/new', (req, res) => {
    res.render('form', {title: "New Message"})
})
indexRouter.get('/message/:id', (req, res) => {
    res.render('details', {title: "Message Details", message: messages[req.params.id]})
})
indexRouter.post('/new', (req, res) => {
    console.log(req.body.text)
    messages.push({
        text: req.body.text,
        user: req.body.user,
        added: new Date(),
        id: messages.length
    })
    res.redirect('/')
})
module.exports = indexRouter;