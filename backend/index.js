const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/events', eventRoutes);

sequelize.sync().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });
});

app.get('/', (req, res) => {
    res.send('Hello World');
}
);
