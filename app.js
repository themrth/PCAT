const express = require('express');
const { default: mongoose } = require('mongoose');
const methodOverride = require('method-override');
const fileUpload = require('express-fileupload');
const app = express();
const photoControllers = require('./controllers/photoControllers');
const pageControllers = require('./controllers/pageControllers');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

// Template Engine
app.set('view engine', 'ejs');

//Routes
app.get('/', photoControllers.getAllPhotos);
app.get('/photos/:id', photoControllers.getPhoto);
app.post('/photos', photoControllers.createPhoto);
app.put('/photos/:id', photoControllers.updatePhoto);
app.delete('/photos/:id', photoControllers.deletePhoto);
app.get('/about', pageControllers.aboutPage);
app.get('/add-photo', pageControllers.addPage);
app.get('/photo', pageControllers.photoPage);
app.get('/photos/edit/:id', pageControllers.editPage);

// MongoDB Connection
mongoose.connect('mongodb+srv://themrth:0JRQ31L5I7V6AaJf@pcat-app.rqdoayw.mongodb.net/pcat-db?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Database Connected');
}).catch((err) => {
  console.log(err);
});

// Local Connection
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is starting on ${port}`);
});
