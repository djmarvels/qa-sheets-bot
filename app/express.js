import express from 'express';
import { config } from 'dotenv';
config();

const app = express();
app.use(express.json())
app.use(
    express.urlencoded({
        extended: true
    })
);

app.get('/', async (req, res) => {
   res.send('API Bot Init');
});

const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
    console.log(`Server listen on port ${PORT}`);
});

export default app;