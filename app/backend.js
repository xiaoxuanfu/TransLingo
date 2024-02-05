require('dotenv').config();
const express = require('express');
const multer = require('multer');
const { memoryStorage } = require('multer');
const bcrypt = require('bcrypt');  // Add this line to use bcrypt for password hashing
const { S3 } = require('aws-sdk');

const storage = memoryStorage();
const upload = multer({ storage });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const s3 = new S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});


const saltRounds = 10;

const generateFilename = (email) => {
    const timestamp = new Date().toISOString().replace(/[-:]/g, '');
    const randomString = Math.random().toString(36).substring(2, 8);
    return `techfest-upload-${email}-${timestamp}-${randomString}`;
};

const uploadAudio = (filename, bucketname, file) => {
    return new Promise((resolve, reject) => {
        const params = {
            Key: filename,
            Bucket: bucketname,
            Body: file,
            ContentType: 'audio/webm',
        };

        s3.upload(params, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data.Location);
            }
        });
    });
};

const users = {};
let registeredFilename = '';  // Variable to store the filename during registration

app.post('/register', upload.single('audiofile'), (req, res) => {
    const { email, password } = req.body;
    console.log("In Register POST")
    console.log(email, password)

    if (users[email]) {
        return res.status(400).send('User with this email already exists.');
    }

    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    users[email] = { email, password: hashedPassword };
    
    // Generate the filename based on the user's email
    registeredFilename = generateFilename(email);

    console.log(req.file)
    const bucketname = 'techfest-audio';
    const file = req.file.buffer;

    uploadAudio(registeredFilename, bucketname, file)
        .then((link) => {
            console.log('File uploaded:', link);
            res.send('Registration successful...');
        })
        .catch((err) => {
            console.error('Error during registration:', err);
            res.status(500).send('Error during registration.');
        });
});

app.post('/login', upload.any(), async (req, res) => {
    console.log('Request Body:', req.body);
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            console.log('Email or password missing');
            return res.status(400).send('Email or password missing.');
        }

        console.log(`Login attempt for email: ${email}`);

        const storedUser = users[email];

        console.log('Stored User:', storedUser);

        if (!storedUser) {
            console.log('User not found');
            return res.status(404).send('User not found.');
        }

        const passwordMatch = await bcrypt.compare(password, storedUser.password);

        if (!passwordMatch) {
            console.log('Incorrect password');
            return res.status(401).send('Incorrect password.');
        }

        // Use the filename generated during registration for S3 retrieval
        const bucketname = 'techfest-audio';

        const params = { Key: registeredFilename, Bucket: bucketname };
        const audioFileStream = s3.getObject(params).createReadStream();

        // Instead of console logging, send the audio data in the response
        const chunks = [];
        audioFileStream.on('data', (chunk) => {
            chunks.push(chunk);
        });

        audioFileStream.on('end', () => {
            const audioData = Buffer.concat(chunks);
            res.send({
                message: 'Login successful.',
                audioData: audioData.toString('base64'), // Convert audio data to base64
            });
        });

        audioFileStream.on('error', (err) => {
            console.error('Error retrieving audio file:', err);
            res.status(500).send('Error retrieving audio file.');
        });

} catch (err) {
        console.error('Error during login:', err);
        res.status(500).send('Error during login.');
    }
});

app.listen(8000, () => {
    console.log('Serving on 8000');
});