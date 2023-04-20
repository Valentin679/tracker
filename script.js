document.getElementById('plusKm').onclick = () => {
    navigator.geolocation.getCurrentPosition(success, error, {
        enableHighAccuracy: true
    })
}

function success({ coords }) {
    // получаем широту и долготу
    const { latitude, longitude } = coords
    const position = [latitude, longitude]
    console.log(position) // [широта, долгота]

}

function error({ message }) {
    console.log(message) // при отказе в доступе получаем PositionError: User denied Geolocation
}



const legend = {
info : [{
            distance : 0.3,
            interval : 0.6,
            direction: "img/72.jpg",
            orientir: "img/72inf.jpg"
        },
        {
            distance : 0.8,
            interval : 1.07,
            direction: "img/73.jpg",
            orientir: ""
        },
        {
            distance : 1.12,
            interval : 0.88,
            direction: "img/74.jpg",
            orientir: "img/74inf.jpg"
        },
        {
            distance : 2,
            interval : false,
            direction: "img/75.jpg",
            orientir: "img/75inf.jpg"
        }
]
}

console.log(legend)
let i = 0; //позиция в массиве
let km;
showStatic();

const succsesPosition = document.getElementById('succsesPosition');
succsesPosition.addEventListener("click", () => (nextPosition()));

const plusKm = document.getElementById('plusKm');
plusKm.addEventListener("click", () => (addAllOdo()));

let allOdometr = document.getElementById('allodo');


function showStatic(){
    let directionLink = document.getElementById('direction');
    let distance = document.getElementById('distance');
    let interval = document.getElementById('interval');
    let orientir = document.getElementById('orientir');
    directionLink.setAttribute('src', legend.info[i].direction);//картинка направления
    orientir.setAttribute('src', legend.info[i].orientir);//картинка ориентира
    distance.innerText = legend.info[i].distance;//дистанция
    interval.innerText = legend.info[i].interval;//Интервал
    tick();
    
};

function nextPosition(){
    if (i<legend.info.length-1){
    i++;
    showStatic();
    }
    else{
        i=0;
        showStatic();
    }
};

function addAllOdo (){
    // let allOdometr = document.getElementById('allodo');
    let distance = document.getElementById('distance');
    km=Number(allOdometr.innerText) + 0.1;
    km = km.toFixed(2);
    // allOdometr.innerText = km;
    if (km > Number(distance.innerText)){
        nextPosition();
    }
    else{
        return
    }
}
            
            
function tick()
{
let sec = 0;
let min = 0;
let hour = 0;
  setInterval(() => {
    //временно пробег
    km=Number(allOdometr.innerText) + 0.1;
    km = km.toFixed(2);
    allOdometr.innerText = km;
    
    // 
    sec++;
    if(sec === 60){
      min++;
      sec = 0;
      if (min ===60) {
        hour++;
        min = 0;
      }
    }
  document.getElementById("alltime").childNodes[0].nodeValue = hour+':'+min+':'+sec;}, 1000);
}

const activeRD = document.querySelector('#RD');
const speedBtns = document.querySelector('.speedRD');
const speedBtnsEls = document.querySelectorAll('.speedRD > button');
activeRD.addEventListener("click", () => activeteRD());
let timeRD = document.querySelector('#alltime');


//Объект с массивами РД

let RD = {
        tickTime : [],
        odo : [],
        speedRul : [],
    
}
let activatedRD = 0;
let speedNowRD = 0;
function activeteRD() {
    //Показать кнопки скорости
    if (speedBtns.classList.contains('show'))
    {
        speedBtns.classList.remove('show');
        activeRD.innerHTML = 'Включить РД';
    }
    else{
    speedBtns.classList.add('show');
    activeRD.innerHTML = 'Закрыть РД';
    speedBtnsEls.forEach(speedBtnsEls => {
        speedBtnsEls.addEventListener('click', speedChange) // Через цикл вешаю на каждый элемент обработчик события на клик, в случае сработки функция change
    })
    
    function speedChange() {
        elem = event.currentTarget; //event.target - буде конкретно то, на чем кликнул, а currentTarget это полностью блок див, где лежит заголовок
        speedNowRD = elem.value;
    }
    //Считаем кол-во активаций РД
    activatedRD++;
    }
    
    
    
    //Запомнить текущие показатели времени и одометра
    

}
const correctSpeedRd = document.querySelector('#correctSpeedRd');


function savePosRD(){
    RD.tickTime.push(timeRD.innerText);
    RD.odo.push(allOdometr.innerText);
    if (correctSpeedRd.value.trim().length === 0){ //Проверка на заполненность импута
    RD.speedRul.push(speedNowRD);
    
    }
    else{
        if (correctSpeedRd.value.trim().indexOf('%')>=0){
            // Когда есть проценты
            let procent = correctSpeedRd.value.slice(0,-1);
            speedNowRD = Number(speedNowRD) - (Number(speedNowRD)*(Number(procent)/100));
            RD.speedRul.push(speedNowRD);
        }
        else{
            //когда проценты не указаны, только целое число
            speedNowRD = Number(speedNowRD) - Number(correctSpeedRd.value.trim());
            RD.speedRul.push(speedNowRD);
        }
    
    }
    // console.log(RD) вывод после каждого добавления отметки
}
const checkPosition = document.querySelector('#checkPosition');
checkPosition.addEventListener("click", () => savePosRD());


//Обработка массивов РД

const resRD = document.querySelector('#minusKm');
resRD.addEventListener("click", () => resultRD());

let startOdometrRD;
let startTimeRD;

function resultRD () {
startOdometrRD = RD.odo[0];
startTimeRD = RD.tickTime[0];
    for (i=1; i<RD.odo.length; i++){
        tripPosition = RD.odo[i]-RD.odo[i-1]; //Расстояние между смежными позициями
        timePosition = Date.parse(RD.tickTime[i])-Date.parse(RD.tickTime[i-1]);//разница во времени между позициями
        
        //Научиться распознавать дату из массива

        //формула как  HMS - ( вычислить идеальное время) на калькуляторе и сравнить с $timePosition
        


        console.log(Date.parse('0:23:12'));
        console.log(tripPosition);
    }
}



// console.log(90-(90*(10/100))); //проценты от скорости


// function geoFindMe() {

//     const status = document.querySelector('#status');
//     const mapLink = document.querySelector('#map-link');
  
//     mapLink.href = '';
//     mapLink.textContent = '';
  
//     function success(position) {
//       latitude  = position.coords.latitude;
//       longitude = position.coords.longitude;
  
//       status.textContent = '';
//       //mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
//       mapLink.href = `https://yandex.ru/maps/12/smolensk/?bookmarks%5Bpid%5D=home&bookmarks%5Buri%5D=ymapsbm1%3A%2F%2Fpin%3Fll%3D${longitude}%252C${latitude}&ll=${longitude}%2C${latitude}&z=12.91`;
//       mapLink.textContent = `Широта: ${latitude} °, Долгота: ${longitude} °`;
//       console.log(position.coords)
//     //   const lat1 = latitude;
//     //   const lon1 = longitude;
//     //   let lat2 = 54.768231;
//     //   let lon2 = 32.014600;
        

//     //   console.log(lat1, lon1, lat2, lon2)
//     }
  
//     function error() {
//       status.textContent = 'Невозможно получить ваше местоположение';
//     }
  
//     if (!navigator.geolocation) {
//       status.textContent = 'Geolocation не поддерживается вашим браузером';
//     } else {
//       status.textContent = 'Определение местоположения…';
//       navigator.geolocation.getCurrentPosition(success, error);
      
//     }
  
//   }
  
//   document.querySelector('#find-me').addEventListener('click', geoFindMe);
