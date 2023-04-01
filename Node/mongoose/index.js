const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/movieApp', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("connection is ok")
})
.catch(err => {
    console.log("oh no error")
    console.log(err)
})

const movieSchema = new mongoose.Schema({
    title: String,
    year: Number, 
    score: Number,
    rating: String
});
  
const Movie = mongoose.model('Movie', movieSchema); 
// -> mongo creates collection 'movies'

const amadeus = new Movie({ title: 'Amadeus',
                            year: 1986, 
                            score: 9.2,
                            rating: 'R'})

// (node) .load index.js -> access to a js file
// (node) variable.save() -> save to a mongodb collection

Movie.insertMany([
    { title: 'Amele', year: 2001, score: 8.3, rating: 'R'},
    { title: 'Alien', year: 1979, score: 8.1, rating: 'R'},
    { title: 'The Iron Giant', year: 1999, score: 7.5, rating: 'PG'},
    { title: 'Stand By Me', year: 1986, score: 8.6, rating: 'R'},
    { title: 'Moonrise Kindom', year: 2012, score: 7.3, rating: 'PG-13'}
])
.then(data => {
    console.log("it worked")
    console.log(data)
})