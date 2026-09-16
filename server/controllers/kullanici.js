import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import User from '../models/kullanici.js'

const me = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "Kullanıcı bulunamadı" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Kullanıcı bilgisi alınamadı" });
    }
};

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
  const signin = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({
            message: "Request body boş.",
        });
    }

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "E-posta ve parola zorunludur.",
        });
    }

    try {
        const kullanici = await User.findOne({ email });

        if (!kullanici) {
            return res.status(404).json({
                message:
                    "Bu e-posta adresine kayıtlı kullanıcı bulunamadı.",
            });
        }

        const parolaKontrolSonuc = await bcrypt.compare(
            password,
            kullanici.password
        );

        if (!parolaKontrolSonuc) {
            return res.status(401).json({
                message: "E-posta veya parola hatalı.",
            });
        }

        const token = jwt.sign(
            {
                _id: kullanici._id,
                email: kullanici.email,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d",
            }
        );

        return res.status(200).json({
            result: kullanici,
            token,
            message: "Giriş başarılı.",
        });
    } catch (error) {
        console.error("SIGNIN ERROR:", error);

        return res.status(500).json({
            message: "Giriş sırasında bir hata oluştu.",
        });
    }
};
const signup = async (req, res) => {
    const {
        email,
        password,
        confirmPassword,
        firstName,
        lastName,
    } = req.body;

    if (!email || !password || !confirmPassword || !firstName || !lastName) {
        return res.status(400).json({
            message: "Tüm alanları doldurunuz.",
        });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({
            message: "Parolalar uyuşmuyor.",
        });
    }

    try {
        const kullanici = await User.findOne({ email });

        if (kullanici) {
            return res.status(409).json({
                message: "Bu e-posta adresi zaten kayıtlı.",
            });
        }

        const sifrelenmisParola = await bcrypt.hash(password, 12);

        const result = await User.create({
            email,
            password: sifrelenmisParola,
            firstName,
            lastName,
        });

        const token = jwt.sign(
            {
                _id: result._id,
                email: result.email,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "30d",
            }
        );

        return res.status(201).json({
            result,
            token,
            message: "Kayıt başarılı.",
        });

    } catch (error) {
        console.error("SIGNUP ERROR:", error);

        return res.status(500).json({
            message: "Kayıt sırasında bir hata oluştu.",
        });
    }
};


export { signin, signup, users, Delete, duzenle, Detay, usersMessage, me };