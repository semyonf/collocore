#!/usr/bin/env node

const
    TRELLO_TOKEN = argFinder('--token'),
    TRELLO_KEY = argFinder('--key'),
    TRELLO_LIST = argFinder('--list'),
    fileWithTickets = process.argv[2];

const
    https = require('https'),
    readLine = require('readline'),
    fs = require('fs');

readLine.createInterface({
    input: fs.createReadStream(fileWithTickets)
}).on('line', function(ticket) {
    addNewTicketToTrello(ticket);
});

/**
 * @param {string} subject Тема
 * @param {string} details Описание
 */
function addNewTicketToTrello(subject, details) {
    addCard(
        subject,
        details,
        TRELLO_LIST,
        null,
        'top'
    );
}

/**
 * @param {string} name     Название карточки
 * @param {string} desc     Описание
 * @param {string} idList   ID списка
 * @param {string} idLabels ID тегов
 * @param {string} pos      Положение в списке ('top' или 'bottom')
 */
function addCard(name, desc, idList, idLabels, pos) {
    sendRequest('/cards', { name, desc, idList, idLabels, pos });
}

/**
 * @param {string} route Маршрут API
 * @param {object} data  Данные в теле запроса
 */
function sendRequest(route, data) {
    const
        BASE_URL = 'api.trello.com',
        API_VER = 1;

    const options = {
        host: BASE_URL,
        path: '/' + API_VER + route + '?key=' + TRELLO_KEY + '&token=' + TRELLO_TOKEN,
        port: 443,
        method: 'POST'
    };

    const req = https.request(options, (res) => {
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                if (res.statusCode !== 200) {
                    console.log('Status: ' + res.statusCode);
                    console.log('Body: ' + chunk);
                    console.log('Data: ' + JSON.stringify(data));
                }
            });
        })
        .on('error', (e) => {
            console.log('Что-то пошло очень не так: ' + e.message);
        });

    req.setHeader('Content-Type', 'application/json');
    req.write(JSON.stringify(data));
    req.end();
}

/**
 * @param {string} key Искомый аргумент
 */
function argFinder(key) {
    const keyPosition = process.argv.findIndex((argument) => {
        return argument === key;
    });

    return process.argv[keyPosition + 1];
}
