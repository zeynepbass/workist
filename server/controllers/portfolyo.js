import Portfolyo  from '../models/portfolyo.js'
import mongoose from 'mongoose';



const getPosts = async (req, res) => {
    try {
        const userId = req.user._id;

        const posts = await Portfolyo.find({ userId });

        return res.status(200).json(posts);
    } catch (error) {
        return res.status(404).json({
            message: error.message,
        });
    }
};
const CreatePost = async (req, res) => {
    try {
        const post = {
            ...req.body,
            userId: req.user._id,
        };

        const newPost = new Portfolyo(post);

        await newPost.save();

        return res.status(201).json(newPost);
    } catch (error) {
        console.error("CREATE POST ERROR:", error);

        return res.status(409).json({
            message: error.message,
        });
    }
};

const Delete = async (req, res) => {
    const { id: _id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send('Geçersiz ID');
    }
  
    try {
      const deletedPost = await Portfolyo.findByIdAndDelete(_id);
  
      if (!deletedPost) {
        return res.status(404).json({ message: 'Post bulunamadı' });
      }
  
      res.status(200).json({ message: 'Post başarıyla silindi' });
    } catch (error) {
      console.error('Silme hatası:', error);
      res.status(500).json({ message: 'Sunucu hatası', error });
    }
  };
  
  const Details=async (req,res)=>{
    const {id}=req.params;

    try {
        const post=await Portfolyo.findById(id)

        res.status(200).json(post)
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}
const Updated=async(req,res)=>{
    const {id:_id}=req.params;
    const post=req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)) res.status(404).send("post bulunamadı")
  
    const guncelPost=await Portfolyo.findByIdAndUpdate(_id,post,{new:true});
    res.status(200).json(guncelPost)
}
const updatePortfolioStatus = async (req, res) => {
  try {
      const { id } = req.params;
      const { durum } = req.body;

      const portfolio = await Portfolyo.findByIdAndUpdate(
          id,
          { durum },
          {
              new: true,
              runValidators: true,
          }
      );

      if (!portfolio) {
          return res.status(404).json({
              message: "Portfolyo bulunamadı.",
          });
      }

      res.status(200).json(portfolio);
  } catch (error) {
      res.status(500).json({
          message: "Portfolyo durumu güncellenemedi.",
          error: error.message,
      });
  }
};

export {
    getPosts,
    CreatePost,
    Delete,
    Details,
    updatePortfolioStatus,
    Updated

}