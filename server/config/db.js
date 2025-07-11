
import mongoose from 'mongoose'
const Baglan = async () => {
    const startTime = new Date();
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const endTime = new Date();
        console.log(`MongoDB bağlantısı süresi: ${endTime - startTime} ms`);
        console.log(`MONGO DB BAGLANDI --> ${conn.connection.name}`);
    } catch (error) {
        console.error('MongoDB bağlantı hatası:', error);
    }
};

export default Baglan;
