
import mongoose from 'mongoose'
const Baglan = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch (error) {
    }
};

export default Baglan;
