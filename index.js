import axios from 'axios'
import { config } from 'dotenv'
import express, { Router } from 'express'
import { GoogleSpreadsheet } from 'google-spreadsheet'
import { JWT } from 'google-auth-library';
import serverless from 'serverless-http';

const unique_apricot = {
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDU9JvJMQ1OqHVI\nFLcIpgeblAf/uhOFc9XFMNM2P3MYnjtenJQ21pQZv9jxdsGxkwCUpLRUXN6lthyv\n8iIBtqOTmkTV3Ba8fx9farIqSPYVbVilz+w6jSRJIo3LzfoXN9sKJWYK1jz5qr5x\nYB88L6XhQCsKNAJIBwXn6rUAvcBemK3qPYRrAsgJHVj8UfPNy/cE2IQ+AonsrR43\nyV7yygS0r9QIE4pAv6piqA0todPXrZdgcjWMUMvEtUoRyTMIc671RWT1T+PBKtsa\nHuKDPS1u9xhFnUMNSKXfPukbIBTJdhmjCRsNeh26Vcx2WISq+KWIED2duI88vF5H\nbCe42AhXAgMBAAECggEACqDTU5pnSR6JjUQ8vFRDpe/16ZKZCHyMVeVGwqWDsjNX\net8tWy1LbUY7ZsBgELjppawwtH3WvjDVbrHoIOtuGjRFV40T9MASye7SdIoj/1Qa\nlq/xYMdhi7rglnmHD/iW2INJpqR5nOujdJdxB6PIehz7PkJJPjIHiUMYBIZJNGSq\nrsBJeF3mh/Z2qSzfPq0HpwKjCDnw5FqPEOOHc3gTXL1QVuRKAc2COHCw7bgZwoM+\nlHmYB/bzlMFK5e/qwxbN9Vw/RC2vI2yq5k3QvQOLCBowVCkKHGCmGXKgrILXWxu+\nZdrsN4TamUF9yha1dQzM/7yq2JK9ky27gv5t8l26tQKBgQDzy2+g7wApfCu9rz1/\nNUMEF2jeM3gjFwIxdppEAWAsAtn8EzWCmRC+9QlMCE7L2Etk6af48RkW0/jISxhq\nIzRr5zNwxQP+GDqkb9Jhc3RmGxy7AL0u18aUgDXjEr5TQx927N6pDp2KrFDjgg8j\nYUxIZXzruru6KDG/oRTKZnRzfQKBgQDfne0WRJthImIKktb7ic/sx8RN/OXpytGE\nWZA8FubJpIQc8j+SeznhvXW9UVWg9mvvJltEFt5cYKffF5gxcoce70TRXY1RJt93\nCuCOkCj97xD5cAYpNEmjhzvjT2vm6hvRKy0+hrPQXmfqM0QbPoNVslpZANOtmcE8\nTU20AY0LYwKBgD4q+mRHjfsGNwE/1qbBpj082vkOluwbyetjGyOMVkHi2EN3goWz\nEpofUieZVr6UgWVSUAsjMAqqMx6gR7GJGK0LYAq5srLw6sNT4IoJLv16nHDzV0rC\nq1ji+NrWxMHms/dXn8/scjASkO3zFHkpLpKnjptuGsD1zvnW0b5rMfbhAoGABgyy\ntlCC15zjhB+22zU+P8yjvexil/GZu3fk1AtWkQv3WwUevSrCRR4oCkgiBenEv8KM\n44mu2FbxE7MCtgvAJhEZDoT2ZsSjdQgBTToPMdd+4RCryf+VImxtLVgfti6NNBpz\n7eYdBT0YmJhsdkQ5r17U3OWN1Ht9Y9E/kegc1bsCgYBxC/PFCqaVoonWFE7uHHBd\n82YrmAWElw/EmAsK4ggaql7sJ1SAXqu9HogGHAOuvZPGDCi9hMpxwQ/6xORhL1ZV\net/9ls+KNe23UeAKi+JP/XajIj/S6fp52VLxPYoBOGIUrFGqzIu1kRDTiVHfx0Zh\nAaMuarzsd95NWUHHwQAbDg==\n-----END PRIVATE KEY-----\n",
};

config()
const app = express()//

const JOKE_API = 'https://v2.jokeapi.dev/joke/Programming?type=single'
const TELEGRAM_URI = `https://api.telegram.org/bot${process.env.TELEGRAM_API_TOKEN}/sendMessage`

app.use(express.json())
app.use(
    express.urlencoded({
        extended: true
    })
)
console.log(process.env.GOOGLE_SPREADSHEET_ID);

const serviceAccountAuth = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: unique_apricot.private_key,//s
    scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
    ],
});
const doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREADSHEET_ID, serviceAccountAuth);

export const getQuestions = async (doc) => {
    const sheet = doc.sheetsByIndex[1];
    const rows = await sheet.getRows();
    return rows.map(row => row.toObject()).map(({ question }) => (question));
};

export const addNameToTable = async ({ name }, doc) => {
    const sheet = doc.sheetsByIndex[0];
    // const cells = await sheet.addRow(['Валера']); // no filter - will load ALL cells in the sheet
    // console.log(cells);
    // const rows = await sheet.getRows();
    // rows.filter(row => (row.toObject().name === 'Валера')).forEach((row) => {
    //     row.set('Вопрос 1', 'Ответ Валеры!');
    //     row.save();
    // });

};

doc.loadInfo().then(async () => {
    const questions = await getQuestions(doc);
    console.log(questions);
    await addNameToTable({ name: 'Валера-123' }, doc);
});


app.post('/new-message', async (req, res) => {
    const { message } = req.body

    const messageText = message?.text?.toLowerCase()?.trim()
    const chatId = message?.chat?.id
    console.log(message);
    if (!messageText || !chatId) {
        return res.sendStatus(400)
    }
})

const router = Router();
router.get("/hello", (req, res) => res.send("Hello World!"));

// const PORT = process.env.PORT || 3000
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`)
// });
export const handler = serverless(app);