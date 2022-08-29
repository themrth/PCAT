const Photo = require('../models/Photos');
const fs = require('fs')

exports.getAllPhotos = async (req, res) => {
  
    const page = req.query.page || 1;
    const photosPerPage = 2;

    const totalPhotos = await Photo.find().countDocuments();

    const photos = await Photo.find({})
    .skip((page-1) * photosPerPage)
    .limit(3)
  
    res.render('main.ejs', {
        photos: photos,
        current: page,
        pages: Math.ceil(totalPhotos / photosPerPage)
  });
};

exports.getPhoto = async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  res.render('photo.ejs', {
    photo,
  });
};

exports.createPhoto = async (req, res) => {
  const createDir = 'public/uploads';
  if (!fs.existsSync(createDir)) {
    fs.mkdirSync(createDir);
  }

  let uploadedImage = req.files.image;
  let uploadPath = __dirname + '/../public/uploads/' + uploadedImage.name;

  uploadedImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadedImage.name,
    });
    res.redirect('/');
  });
};

exports.updatePhoto = async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  photo.title = req.body.title;
  photo.description = req.body.description;
  photo.save();

  res.redirect(`/photos/${req.params.id}`);
};

exports.deletePhoto = async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  const deletedImage = __dirname + '/../public' + photo.image;
  fs.unlinkSync(deletedImage);
  await Photo.findByIdAndRemove(req.params.id);
  res.redirect('/');
};
