// надписи и цвета на секторах
const prizes = [
  {
    text: "Вы на коне! Но это не смягчит ваш характер... Вас не сдерживают, а может быть следовало бы... Только не увольняйте никого, пожалуйста, игроки Б тоже хотят быть в команде!",
    color: "hsl(197 30% 43%)",
  },
  { 
    text: "Есть 50 способов покинуть любимую и только один способ быть счастливым: покинуть это судно через аварийный выход. А какое именно судно, решите для себя сами)",
    color: "hsl(173 58% 39%)",
  },
  { 
    text: "Возможно, вам пора в деревню для пенсионеров. Да, вы порождение ночи, но выглядите ужасно и вас ожидают обоссапочки. Шучу, просто отдохните как следует!",
    color: "hsl(43 74% 66%)",
  },
  {
    text: "Кливле Ганс отстукивал числа копытом, оглядываясь на хозяев. А на кого оглядываетесь вы? Помните, что конь отупел, когда ему завязали глаза. Занимайтесь математикой сами)",
    color: "hsl(27 87% 67%)",
  },
  {
    text: "Вы наигрались в Бонни и Клайда и смотрите на отношения уже не так радужно. Пора просмотреть свой мысленный список и стащить картину в каком-нибудь новом месте! Только выберите партнера с именем попроще...",
    color: "hsl(12 76% 61%)",
  },
  {
    text: "Ваши руки болят, потому что они непривычны к такой работе. Так что ну её, эту работу, вам нужно отдохнуть. Это лишь один из способов, которым вы можете проявить любовь и заботу к себе!",
    color: "hsl(350 60% 52%)",
  },
  {
    text: "Психологов приучают относиться к позитиву с подозрением, как к плоду торгашества. Не слушайте их, не плавайте в рассоле горя, всё будет хорошо!",
    color: "hsl(91 43% 54%)",
  },
  {
    text: "Никто не сможет вернуть ваш эфир, отправленный на наш кошелёк по ошибке. Будьте внимательны! Тщательно выбирайте сеть и сайты с фиксированными матчами.",
    color: "hsl(140 36% 74%)",
  },
  {
    text: "Останавливаетесь пописать каждые десять минут? Кашляете как карлик, давящийся горящей тряпкой? Проверьте-ка здоровье и ешьте побольше вишни, ведь она снижает воспаление!",
    color: "hsl(234 75.2% 60.8%)",
  },
  {
    text: "Вы не на своём месте. Например, ищете женский туалет, хоть вы и мужчина. Или со скрипящими коленями лезете из окна на клумбу. А может даже вы кенгуру, она свинья и вы не можете быть вместе...",
    color: "hsl(360 75.2% 60.8%)",
  },
  {
    text: "Ваши отношения так же крепки, как у Логана Пола и Нины Агдал. Ждите неожиданных предложений, которые докажут насколько вы совместимы!",
    color: "hsl(32 100% 71.7%)",
  },
  {
    text: "Вы вернёте форму к финальному Уимблдону, и пусть прежде была жёсткая ничья, вы залечите свои травмы и кааааак покажете им всем! А там и на пенсию можно)",
    color: "hsl(305 100% 71.7%)",
  },
  {
    text: "Даже если посмотреть на абсолютно пустой участок, там будут колебания как колебания океана! Но только не в вас, вас не колышет. Продолжайте в том же духе!",
    color: "hsl(223 100% 60%)",
  },
  {
    text: "Скоро дешёвая капсула с дешёвыми препаратами не долетит. И тогда вы не наломаете дров, а покажете себя во всей красе! А пока отдыхайте...",
    color: "hsl(86 100% 60%)",
  },
];

// создаём переменные для быстрого доступа ко всем объектам на странице — блоку в целом, колесу, кнопке и язычку
const wheel = document.querySelector(".deal-wheel");
const spinner = wheel.querySelector(".spinner");
const trigger = wheel.querySelector(".btn-spin");
const ticker = wheel.querySelector(".ticker");

// на сколько секторов нарезаем круг
const prizeSlice = 360 / prizes.length;
// на какое расстояние смещаем сектора друг относительно друга
const prizeOffset = Math.floor(180 / prizes.length);
// прописываем CSS-классы, которые будем добавлять и убирать из стилей
const spinClass = "is-spinning";
const selectedClass = "selected";
// получаем все значения параметров стилей у секторов
const spinnerStyles = window.getComputedStyle(spinner);

// переменная для анимации
let tickerAnim;
// угол вращения
let rotation = 0;
// текущий сектор
let currentSlice = 0;
// переменная для текстовых подписей
let prizeNodes;

// расставляем текст по секторам
const createPrizeNodes = () => {
  // обрабатываем каждую подпись
  prizes.forEach(({ text, color, reaction }, i) => {
    // каждой из них назначаем свой угол поворота
    const rotation = ((prizeSlice * i) * -1) - prizeOffset;
    // добавляем код с размещением текста на страницу в конец блока spinner
    spinner.insertAdjacentHTML(
      "beforeend",
      // текст при этом уже оформлен нужными стилями
      `<li class="prize" data-reaction=${reaction} style="--rotate: ${rotation}deg">
        <span class="text">${text}</span>
      </li>`
    );
  });
};

// рисуем разноцветные секторы
const createConicGradient = () => {
  // устанавливаем нужное значение стиля у элемента spinner
  spinner.setAttribute(
    "style",
    `background: conic-gradient(
      from -90deg,
      ${prizes
        // получаем цвет текущего сектора
        .map(({ color }, i) => `${color} 0 ${(100 / prizes.length) * (prizes.length - i)}%`)
        .reverse()
      }
    );`
  );
};

// создаём функцию, которая нарисует колесо в сборе
const setupWheel = () => {
  // сначала секторы
  createConicGradient();
  // потом текст
  createPrizeNodes();
  // а потом мы получим список всех призов на странице, чтобы работать с ними как с объектами
  prizeNodes = wheel.querySelectorAll(".prize");
};

// определяем количество оборотов, которое сделает наше колесо
const spinertia = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// функция запуска вращения с плавной остановкой
const runTickerAnimation = () => {
  // взяли код анимации отсюда: https://css-tricks.com/get-value-of-css-rotation-through-javascript/
  const values = spinnerStyles.transform.split("(")[1].split(")")[0].split(",");
  const a = values[0];
  const b = values[1];  
  let rad = Math.atan2(b, a);
  
  if (rad < 0) rad += (2 * Math.PI);
  
  const angle = Math.round(rad * (180 / Math.PI));
  const slice = Math.floor(angle / prizeSlice);

  // анимация язычка, когда его задевает колесо при вращении
  // если появился новый сектор
  if (currentSlice !== slice) {
    // убираем анимацию язычка
    ticker.style.animation = "none";
    // и через 10 миллисекунд отменяем это, чтобы он вернулся в первоначальное положение
    setTimeout(() => ticker.style.animation = null, 10);
    // после того, как язычок прошёл сектор - делаем его текущим 
    currentSlice = slice;
  }
  // запускаем анимацию
  tickerAnim = requestAnimationFrame(runTickerAnimation);
};

// функция выбора призового сектора
const selectPrize = () => {
  const selected = Math.floor(rotation / prizeSlice);
  prizeNodes[selected].classList.add(selectedClass);
};

// отслеживаем нажатие на кнопку
trigger.addEventListener("click", () => {
  // делаем её недоступной для нажатия
  trigger.disabled = true;
  // задаём начальное вращение колеса
  rotation = Math.floor(Math.random() * 360 + spinertia(2000, 5000));
  // убираем прошлый приз
  prizeNodes.forEach((prize) => prize.classList.remove(selectedClass));
  // добавляем колесу класс is-spinning, с помощью которого реализуем нужную отрисовку
  wheel.classList.add(spinClass);
  // через CSS говорим секторам, как им повернуться
  spinner.style.setProperty("--rotate", rotation);
  // возвращаем язычок в горизонтальную позицию
  ticker.style.animation = "none";
  // запускаем анимацию вращение
  runTickerAnimation();
});

// отслеживаем, когда закончилась анимация вращения колеса
spinner.addEventListener("transitionend", () => {
  // останавливаем отрисовку вращения
  cancelAnimationFrame(tickerAnim);
  // получаем текущее значение поворота колеса
  rotation %= 360;
  // выбираем приз
  selectPrize();
  // убираем класс, который отвечает за вращение
  wheel.classList.remove(spinClass);
  // отправляем в CSS новое положение поворота колеса
  spinner.style.setProperty("--rotate", rotation);
  // делаем кнопку снова активной
  trigger.disabled = false;
});

// подготавливаем всё к первому запуску
setupWheel();
