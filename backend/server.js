import express from 'express';
import pool from "./config/db.js";
import cors from 'cors';
import { hashPassword, verifyPassword, generateToken} from './Services/authServices.js';
import { verifyToken } from './middleware/authMiddleware.js';

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5000;


//SignUp 
app.post('/signup', async (req, res) => {
    const { fullNames, idNumber, accountNumber, password } = req.body;
    const hashedPassword = await hashPassword(password);// hash the password before inserting it 
    try {

        const sql = `INSERT INTO users(Full_name, id_number, account_number, password) VALUES(?, ?, ?, ?)`; 
        const [results] = await pool.query(sql, [fullNames, idNumber, accountNumber, hashedPassword]);  
        res.status(200).json({ message: "Account creation was succesful" })  
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Account Creation error, no duplication allowed" });
    }
})
 
app.post('/login', async (req, res) => {
    const { idNumber, password } = req.body;
    const [result] = await pool.query(`SELECT id, password FROM users WHERE id_number = ?`, [idNumber]);
    if (result.length <= 0) {
        return res.status(404).json({ message: "User does not exist" });
    }

    const dbPassword = result[0].password;
    const userId= result[0].id;

    const isValid = await verifyPassword(password, dbPassword);
    if(isValid) {
        const token = await generateToken(userId)
        console.log(token) 
        return res.status(200).json({message: "success", token: token})
    } else{
        return res.status(404).json({message: "Password incorrect"})
    }
})

app.get('/dashboard', verifyToken, (req, res) => {
    res.json({message: `Welcome user ${req.userId}`});  
});


app.listen(PORT, () => {
    console.log(`Server running and it is listing to port ${PORT}`); 
}); 