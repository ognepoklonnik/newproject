import moment from 'moment';  // npm пакет для работы с датой/число и время

const apiUrl = 'https://dashboard.elering.ee/api';  // api url


//экспортируем асинхронную функцию которая запрашивает текущую стоимость электорэнергии.
// запрос GET /nps/price/ee/current - endpoint
//await позволяет даждаться ответа с api
// fetch возвращает Promise/обещание и при правильном выполнении обьект Response.
//каждый response имеет функцию .json() которая переводит JSON в js обьект.

export async function getCurrentPrice () {
    const country = 'EE';
    const response = await fetch(`${apiUrl}/nps/price/${country}/current`);
    return response.json();
};

export async function getPriceData() {

    //moment() - выдает moment object в текущем времени и датой 
    // .uts() - конвертирует его в нулевой часовой пояс
    // substract - вычетает
    // .format() - превращает moment object в Строчку String с удобным форматом чтения

    const start = moment().utc().subtract(10, 'hours').format();
    const end = moment().utc().add(30, 'hours').format();
    // URLSearchParams  - превращает js object в строчку для url
    const params = new URLSearchParams({start, end});
    const response = await fetch(`${apiUrl}/nps/price?${params}`);
    return response.json();
};