import Ilanlarim from '../models/ilanlarim.js';
import mongoose from 'mongoose';

const hizmetTuru = {
  'Grafik & Tasarım': ['Logo Tasarımı', 'Afiş Tasarımı', 'Sosyal Medya Postu'],
  'Yazı & Çeviri': ['Makale', 'Blog Yazısı', 'Kitap Çevirisi'],
  'Yazılım & Teknoloji': ['Web Uygulaması', 'Mobil Uygulama', 'API Geliştirme'],
};

function findMatchingCategories(searchTerm) {
  const lower = searchTerm.toLowerCase();
  const matches = [];

  for (const [category, subs] of Object.entries(hizmetTuru || selectedSubcategory)) {
    if (category.toLowerCase().includes(lower)) {
      matches.push(category);
    }
    for (const sub of subs) {
      if (sub.toLowerCase().includes(lower)) {
        matches.push(sub);
      }
    }
  }

  return matches;
}

const getPost = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search) {
      query = {
        $or: [
          { hizmetTuru: { $regex: search, $options: 'i' } },
          { selectedSubcategory: { $regex: search, $options: 'i' } }
        ]
      };
    }

    const posts = await Ilanlarim.find(query);
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


const getPosts = async (req, res) => {
  const { userId } = req.params;
  try {
    const posts = await Ilanlarim.find({ userId });
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


const CreatePost = async (req, res) => {
  const post = req.body;

  try {
    const newPost = new Ilanlarim(post);
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};


const Delete = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send('Geçersiz ID');
  }

  try {
    const deletedPost = await Ilanlarim.findByIdAndDelete(_id);

    if (!deletedPost) {
      return res.status(404).json({ message: 'Post bulunamadı' });
    }

    res.status(200).json({ message: 'Post başarıyla silindi' });
  } catch (error) {
    console.error('Silme hatası:', error);
    res.status(500).json({ message: 'Sunucu hatası', error });
  }
};


const Details = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Ilanlarim.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


const Updated = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Post bulunamadı");
  }

  const guncelPost = await Ilanlarim.findByIdAndUpdate(_id, post, { new: true });
  res.status(200).json(guncelPost);
};

export {
  getPosts,
  CreatePost,
  Delete,
  Details,
  Updated,
  getPost
};
