const Photo = require('../models/Photos');

exports.aboutPage = (req, res) => {
  res.render('about.ejs');
};

exports.addPage = (req, res) => {
  res.render('add-photo.ejs');
};

exports.photoPage = (req, res) => {
  res.render('photo.ejs');
};

exports.editPage = async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  res.render('edit-photo.ejs', {
    photo,
  });
};
