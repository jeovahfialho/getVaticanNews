const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const PORT = 3000;

// URL da página de notícias
const URL = 'https://www.vaticannews.va/pt/papa.pagelist.html';

app.get('/news', async (req, res) => {
    try {
        const newsTitles = [];
        const response = await axios.get(URL);
        const $ = cheerio.load(response.data);
        
        // Atualização do seletor para corresponder à nova estrutura
        $('h2.teaser__title > a > span').each((i, elem) => {
            const title = $(elem).text().trim();
            const link = 'https://www.vaticannews.va' + $(elem).parent().attr('href');

            newsTitles.push({ title, link });
        });

        res.json(newsTitles);
    } catch (error) {
        console.error("Erro ao buscar notícias:", error);
        res.status(500).send('Erro ao buscar notícias');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
