
const PAGE_SIZE = 3;
let data = [
  {
    "id": 1,
    "name": "Leanne Graham",
    "email": "Sincere@april.biz",
    "website": "hildegard.org",
  },
  {
    "id": 2,
    "name": "Ervin Howell",
    "email": "Shanna@melissa.tv",
    "website": "anastasia.net",
  },
  {
    "id": 3,
    "name": "Clementine Bauch",
    "email": "Nathan@yesenia.net",
    "website": "ramiro.info",
  },
  {
    "id": 4,
    "name": "Patricia Lebsack",
    "email": "Julianne.OConner@kory.org",
    "website": "kale.biz",
  },
  {
    "id": 5,
    "name": "Chelsey Dietrich",
    "email": "Lucio_Hettinger@annie.ca",
    "website": "demarco.info",
  },
  {
    "id": 6,
    "name": "Mrs. Dennis Schulist",
    "email": "Karley_Dach@jasper.info",
    "website": "ola.org",
  },
  {
    "id": 7,
    "name": "Kurtis Weissnat",
    "email": "Telly.Hoeger@billy.biz",
    "website": "elvis.io",
  },
  {
    "id": 8,
    "name": "Nicholas Runolfsdottir V",
    "email": "Sherwood@rosamond.me",
    "website": "jacynthe.com",
  },
  {
    "id": 9,
    "name": "Glenna Reichert",
    "email": "Chaim_McDermott@dana.io",
    "website": "conrad.com",
  },
];

function uid(len) {
  len = len || 7;
  return Math.random().toString(35).substr(2, len);
}

function getData(page) {
  const start = (page - 1) * PAGE_SIZE;
  return {
    status: 'success',
    total: data.length,
    page,
    data: data.slice(start, start + 3),
  };
}

export default {
  'GET /api/BLOCK_NAME': (req, res) => {
    res.json(getData(parseInt(req.query.page, 10) || 1));
  },
  'DELETE /api/BLOCK_NAME/:id': (req, res) => {
    data = data.filter(item => `${item.id}` !== `${req.params.id}`);
    res.end('ok');
  },
  'PATCH /api/BLOCK_NAME/:id': (req, res) => {
    data.forEach(item => {
      if (`${item.id}` === `${req.params.id}`) {
        Object.assign(item, req.body);
      }
    });
    res.end('ok');
  },
  'POST /api/BLOCK_NAME': (req, res) => {
    data.push({
      ...req.body,
      id: uid(),
    });
    res.end('ok');
  },
};
