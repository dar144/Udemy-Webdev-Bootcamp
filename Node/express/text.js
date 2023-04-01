const express = require('express')
const methodOverride = require('method-override')
const path = require('path')
const app = express()
const port = 8080

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride('_method'))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

const { v4: uuid } = require('uuid');

let comments = [
  {
    id: uuid(),
    username: 'Todd',
    comment: 'pirozki ot Lovett',
  },
  {
    id: uuid(),
    username: 'Lovett',
    comment: 'meat meat meat',
  },
  {
    id: uuid(),
    username: 'DashBarabash',
    comment: 'tired',
  },
]


app.get('/comments', (req, res) => {
  res.render('comments/index', { comments });
})

app.get('/comments/new', (req, res) => {
  res.render('comments/new');
})

app.post('/comments', (req, res) => {
  const {username, comment} = req.body;
  comments.push({username, comment, id: uuid()});
  res.redirect('/comments')
})

app.get('/comments/:id', (req, res) => {
  const { id } = req.params;
  const comment = comments.find(c => c.id === id);
  res.render('comments/show', { comment })
})



app.get('/comments/:id/edit', (req, res) => {
  const { id } = req.params;
  const comment = comments.find(c => c.id === id);
  res.render('comments/edit', { comment })
})

app.patch('/comments/:id', (req, res) => {
  const { id } = req.params;
  const newComment = req.body.comment;
  const foundComment = comments.find(c => c.id === id);
  foundComment.comment = newComment;
  res.redirect('/comments')
})

app.delete('/comments/:id', (req, res) => {
  const { id } = req.params;
  comments = comments.filter(c => c.id !== id);
  res.redirect('/comments')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})








