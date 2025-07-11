import jwt from 'jsonwebtoken';

const Auth = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (token) {
            const decodedData = jwt.verify(token, 'aos-secret-key');
            req.userId = decodedData?.id;
        }

        next();
    } catch (error) {
        console.log(error);
        
        res.status(401).json({ message: 'Authentication failed' });
    }
};

export default Auth;
