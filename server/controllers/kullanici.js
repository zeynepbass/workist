import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import User from '../models/kullanici.js'

const usersMessage = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
      } catch (err) {
        res.status(500).json({ error: "Kullanıcılar getirilemedi" });
      }
};
const Detay = async (req, res) => {
    const { email } = req.params;

    try {
       
        const user = await User.findOne({ email });


        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const signin=async (req,res)=>{

    const {email,password}=req.body;

    try {

        const isim=await User.findOne({email})
    
        
        if(!isim) return res.status(404).json({message:'Kullanıcı Bulunamadı'})

        const kullanici=await User.findOne({email})
    
        
        if(!kullanici) return res.status(404).json({message:'Kullanıcı Bulunamadı'})

        const parolaKontrolSonuc=await bcrypt.compare(password,kullanici.password);

        if(!parolaKontrolSonuc) return res.status(400).json({message:'Parolayı doğru giriniz'})

        const token=jwt.sign({email:kullanici.email,id:kullanici._id},'aos-secret-code',    { expiresIn: '1h' } )

        res.status(200).json({result:kullanici,token})

    } catch (error) {

        res.status(500).json({message:'Bir hata oluştu'})
        
    }
}
const duzenle = async (req, res) => {
    const { email } = req.params; 
    const updatedFields = req.body;
  
    try {

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send("User not found");
        }
  
        Object.assign(user, updatedFields);
  
        if (req.body.password) {
            const hashedPassword = await bcrypt.hash(req.body.password, 12);
            user.password = hashedPassword;
        }

        const updatedUser = await user.save();
  
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
  };
  const users = async (req, res) => {
    const { id } = req.params; 
    try {

      const users = await User.find({ _id: { $ne: id } }).select("firstName lastName file");
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: "Kullanıcılar bulunamadı" });
    }
  };
  
const Delete = async (req, res) => {
    const { email } = req.params;
  
    try {

      const user = await User.findOne({ email });
  

      if (!user) {
        return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
      }
  

      await User.findByIdAndDelete(user._id);
  
 
      res.status(200).json({ message: 'Kullanıcı silindi' });
    } catch (error) {
      console.error('Kullanıcı silme hatası:', error);
      res.status(500).json({ message: 'Bir hata oluştu' });
    }
  };

const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;

    try {
        const kullanici = await User.findOne({ email });

        if (kullanici) return res.status(400).json({ message: 'Kullanıcı Zaten Bulunuyor' });

        if (password !== confirmPassword) return res.status(400).json({ message: 'Parolalar uyuşmadı!' });

        const sifrelenmisParola = await bcrypt.hash(password, 12);

        const result = await User.create({
            email,
            password: sifrelenmisParola,
            firstName,
            lastName,
        });

        const token = jwt.sign({ email: result.email, id: result._id }, 'aos-secret-key', { expiresIn: '30d' });

        res.status(200).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: 'Bir hata oluştu' });
    }
};



export { signin, signup,users,Delete,duzenle,Detay,usersMessage };