const express = require('express');
const fs = require('fs');
const app = express();

const PORT = process.env.PORT || 80;
const qanda = JSON.parse(fs.readFileSync(__dirname + '/data.json').toString());

function repHtml(html, src, dst) {
    while (html.toString().includes(src)) {
        html = html.toString().replace(src, dst);
    }

    return html;
}

function addQuestionToTheDB(question) {
    // to do
}

app.get('/', (req, res)=>{
    // get random q & a
    let questions = Object.keys(qanda);
    let pair_index = Math.floor(Math.random() * questions.length);
    let question = questions[pair_index];
    let answer = qanda[question];

    let html = fs.readFileSync(__dirname + '/crowd-wisdom.html');

    html = repHtml(html, '#question#', question);
    html = repHtml(html, '#answer#', answer);

    res.send(html);
});

app.listen(PORT, (err)=>{
    if (err)
        throw err;

    console.log('App Started');
});