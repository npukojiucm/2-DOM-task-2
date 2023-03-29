/* eslint-disable no-use-before-define */
/* eslint-disable object-curly-newline */
/* eslint-disable no-restricted-syntax */
const dataInput = [
  {
    id: 26,
    title: 'Побег из Шоушенка',
    imdb: 9.30,
    year: 1994,
  },
  {
    id: 25,
    title: 'Крёстный отец',
    imdb: 9.20,
    year: 1972,
  },
  {
    id: 27,
    title: 'Крёстный отец 2',
    imdb: 9.00,
    year: 1974,
  },
  {
    id: 1047,
    title: 'Тёмный рыцарь',
    imdb: 9.00,
    year: 2008,
  },
  {
    id: 223,
    title: 'Криминальное чтиво',
    imdb: 8.90,
    year: 1994,
  },
];

function createDOM(data) {
  for (const obj of data) {
    // eslint-disable-next-line object-curly-newline
    const { id, title, imdb, year } = obj;

    const tr = document.createElement('tr');
    tr.dataset.id = id;
    tr.dataset.title = title;
    tr.dataset.year = year;
    tr.dataset.imdb = imdb;

    createElements(tr);

    const tbody = document.querySelector('tbody');
    tbody.append(tr);
  }
}
function createElements(parent) {
  const items = [
    parent.dataset.id,
    parent.dataset.title,
    parent.dataset.year,
    parent.dataset.imdb,
  ];

  let count = 0;
  while (count < items.length) {
    const td = document.createElement('td');

    if (items[count] === parent.dataset.year) {
      td.textContent = `(${items[count]})`;
      parent.append(td);
    } else if (items[count] === parent.dataset.imdb) {
      td.textContent = `IMDB: ${items[count]}`;
      parent.append(td);
    } else {
      td.textContent = items[count];
      parent.append(td);
    }

    count += 1;
  }

  return parent;
}

function sortTable({ rule, attr }) {
  const tbody = document.querySelector('tbody');
  const trChildren = tbody.querySelectorAll('tr');
  const trArray = [...trChildren];

  tbody.replaceChildren();

  if (rule === 'min') {
    trArray.sort((a, b) => a.dataset[attr] - b.dataset[attr]);
  } else if (rule === 'max') {
    trArray.sort((a, b) => b.dataset[attr] - a.dataset[attr]);
  }

  trArray.forEach((parent) => {
    parent.replaceChildren();
    createElements(parent, parent.dataset);
    tbody.append(parent);
  });
}

function sortRule() {
  const rules = {
    1: {
      rule: 'min',
      attr: 'id',
    },
    2: {
      rule: 'max',
      attr: 'id',
    },
    3: {
      rule: 'min',
      attr: 'title',
    },
    4: {
      rule: 'max',
      attr: 'title',
    },
    5: {
      rule: 'min',
      attr: 'year',
    },
    6: {
      rule: 'max',
      attr: 'year',
    },
    7: {
      rule: 'min',
      attr: 'imdb',
    },
    8: {
      rule: 'max',
      attr: 'imdb',
    },
  };

  const rule = window.localStorage.getItem('rule');

  if (!rule) {
    window.localStorage.setItem('rule', 2);
    return sortTable(rules[1]);
  }
  if (rule === 8) {
    window.localStorage.setItem('rule', 1);
  } else {
    window.localStorage.setItem('rule', +rule + 1);
  }

  return sortTable(rules[rule]);
}

createDOM(dataInput);
setInterval(sortRule, 5000);
