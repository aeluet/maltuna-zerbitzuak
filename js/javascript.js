let username;
let password;
let bizikleta_okupazioa;
let kotxe_okupazioa;
let ordenagailu_okupazioa;
let user;

if (localStorage.getItem("bizikleta_okupazioa") == null){
    let bizikleta_okupazioa = [];
    localStorage.setItem("bizikleta_okupazioa", JSON.stringify(bizikleta_okupazioa));
}

if (localStorage.getItem("kotxe_okupazioa") == null){
    let kotxe_okupazioa = [];
    localStorage.setItem("kotxe_okupazioa", JSON.stringify(kotxe_okupazioa));
}

if (localStorage.getItem("ordenagailu_okupazioa") == null){
    let ordenagailu_okupazioa = [];
    localStorage.setItem("ordenagailu_okupazioa", JSON.stringify(ordenagailu_okupazioa));
}

function onlogin(){
    var YOUR_CLIENT_ID = '332840859036-5mqkq80tv0nen1mu1cnjgpebp68u5if3.apps.googleusercontent.com';
    var YOUR_REDIRECT_URI = 'https://aeluet.github.io/maltuna-zerbitzuak/produktuak';
    var fragmentString = location.hash.substring(1);

    // Parse query string to see if page request is coming from OAuth 2.0 server.
    var params = {};
    var regex = /([^&=]+)=([^&]*)/g, m;
    while (m = regex.exec(fragmentString)) {
    params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    }
    if (Object.keys(params).length > 0) {
        alert("sartu da");
        localStorage.setItem('oauth2-test-params', JSON.stringify(params) );
        if (params['state'] && params['state'] == 'onSignIn') {
          onSignIn();
        }
    }

// If there's an access token, try an API request.
// Otherwise, start OAuth 2.0 flow.
function onSignIn() {
var params = JSON.parse(localStorage.getItem('oauth2-test-params'));
if (params && params['access_token']) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET',
      'https://www.googleapis.com/drive/v3/about?fields=user&' +
      'access_token=' + params['access_token']);
  xhr.onreadystatechange = function (e) {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log(xhr.response);
    } else if (xhr.readyState === 4 && xhr.status === 401) {
      // Token invalid, so prompt for user permission.
      oauth2SignIn();
    }
  };
  xhr.send(null);
} else {
  oauth2SignIn();
}
}

/*
* Create form to request access token from Google's OAuth 2.0 server.
*/
function oauth2SignIn() {
// Google's OAuth 2.0 endpoint for requesting an access token
var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

// Create element to open OAuth 2.0 endpoint in new window.
var form = document.createElement('form');
form.setAttribute('method', 'GET'); // Send as a GET request.
form.setAttribute('action', oauth2Endpoint);

// Parameters to pass to OAuth 2.0 endpoint.
var params = {'client_id': YOUR_CLIENT_ID,
              'redirect_uri': YOUR_REDIRECT_URI,
              'scope': 'https://www.googleapis.com/auth/drive.metadata.readonly',
              'state': 'onSignIn',
              'include_granted_scopes': 'true',
              'data-ux_mode': 'redirect',
              'response_type': 'token'};

// Add form parameters as hidden input values.
for (var p in params) {
  var input = document.createElement('input');
  input.setAttribute('type', 'hidden');
  input.setAttribute('name', p);
  input.setAttribute('value', params[p]);
  form.appendChild(input);
}

// Add form to page and submit it to open the OAuth 2.0 endpoint.
document.body.appendChild(form);
form.submit();
}
    
}


async function login(){
    username = document.querySelector("#username").value;
    password = document.querySelector("#password").value;
    
    await fetch('accounts/accounts.json').then(response => response.json()).then(json_response => accounts_json = json_response);
    
    let sartu = 0;
    for(i = 0; i < accounts_json.length; i++){
        let obj = accounts_json[i];
        if(username == obj.username && password == obj.password){
            sartu = 1;
            console.log('Erabiltzailea eta pasahitza zuzenak dira');
            if (username == "admin"){
                window.location.href = 'portfolio-details.html';
                localStorage.setItem("username", "admin");
            }else{
                window.location.href = 'produktuak.html';
                localStorage.setItem("username", username);
            }
        }
    }
    if(sartu == 0){
        alert("Erabiltzailea edo pasahitza ez dira zuzenak!!");
    }
}
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      alert('User signed out.');
    });
  }

function bukatuSaioa(){
    //signOut();
    window.location.href = "index.html";
}
function aldatuData(id){
    let aurreko_data = document.getElementsByClassName("timing selected")[0];
    
    let data = document.getElementById(id);
    if(data.className != "timing okupata"){
        if(aurreko_data != null){
            aurreko_data.className = "timing";
        }
        data.className += " selected";
    }
}

function book(){
    bizikleta_okupazioa = JSON.parse(localStorage.getItem("bizikleta_okupazioa"));
    let aukera_data = document.getElementsByClassName("timing selected")[0];
    if(aukera_data!=null){
        aukera_data.className = "timing okupata";
        bizikleta_okupazioa.push(aukera_data.getAttribute("id"));

        localStorage.setItem("bizikleta_okupazioa", JSON.stringify(bizikleta_okupazioa));
        window.location.href = "produktuak.html";
    }else{
        alert("Aukeratu data bat aurrera egin aurretik!");
    }
    
}

function bookKotxe(){
    kotxe_okupazioa = JSON.parse(localStorage.getItem("kotxe_okupazioa"));
    let aukera_data = document.getElementsByClassName("timing selected")[0];
    if(aukera_data!=null){
        aukera_data.className = "timing okupata";
        kotxe_okupazioa.push(aukera_data.getAttribute("id"));

        localStorage.setItem("kotxe_okupazioa", JSON.stringify(kotxe_okupazioa));
        window.location.href = "produktuak.html";
    }else{
        alert("Aukeratu data bat aurrera egin aurretik!");
    }
    
}

function bookOrdenagailua(){
    ordenagailu_okupazioa = JSON.parse(localStorage.getItem("ordenagailu_okupazioa"));
    let aukera_data = document.getElementsByClassName("timing selected")[0];
    if(aukera_data!=null){
        aukera_data.className = "timing okupata";
        ordenagailu_okupazioa.push(aukera_data.getAttribute("id"));

        localStorage.setItem("ordenagailu_okupazioa", JSON.stringify(ordenagailu_okupazioa));
        window.location.href = "produktuak.html";
    }else{
        alert("Aukeratu data bat aurrera egin aurretik!");
    }
    
}

function getDayAndMonth(dayIndex) {
  const daysOfWeek = ['Astelehena', 'Asteartea', 'Asteazkena', 'Osteguna', 'Ostirala', 'Larunbata', 'Igandea'];
  const currentDate = new Date();
  
  // Find the difference between the current day and Monday (considering Monday as the first day of the week)
  const dayDifference = currentDate.getDay() - daysOfWeek.indexOf('Astelehena');
  const targetDate = new Date(currentDate);
  targetDate.setDate(currentDate.getDate() - dayDifference + dayIndex);

  const dayName = daysOfWeek[targetDate.getDay()];
  const dayOfMonth = targetDate.getDate();
  const monthName = targetDate.toLocaleString('eu', { month: 'long' });

  return {
    day: dayName,
    dayOfMonth: dayOfMonth,
    month: monthName
  };
}



function gehituSchedule(){
    // Get the day and month for each day of the week
    for (let i = 0; i < 7; i++) {
        const dayInfo = getDayAndMonth(i);
        
        //alert(`${dayInfo.day}, Day ${dayInfo.dayOfMonth} of ${dayInfo.month}`);
    }
    
    bizikleta_okupazioa = JSON.parse(localStorage.getItem("bizikleta_okupazioa"));
    
    let contenido = document.getElementById("day-slot");
    let egunak = "<ul><li class='left-arrow'><a href='#'><i class='fa fa-chevron-left'></i></a></li>";
    for (let i = 0; i < 7; i++) {
        const dayInfo = getDayAndMonth(i);
        egunak += "<li><span>"+dayInfo.day+"</span><span class='slot-date'>" + dayInfo.dayOfMonth + " " + dayInfo.month + " <small class='slot-year'>" + 2024 + "</small></span></li>";
    }
    egunak += "<li class='right-arrow'><a href='#'><i class='fa fa-chevron-right'></i></a></li></ul>";
    contenido.innerHTML = egunak;
    
    contenido = document.getElementById("schedule-cont");
    let taula = "<div class='row'><div class='col-md-12'><div class='time-slot'><ul class='clearfix'>";
    
    for(i = 0; i < 5; i++){
        taula += "<li>";
        let id = "";
        if(i==0){
            id = "mon-";
        }
        if(i==1){
            id = "tue-";
        }
        if(i==2){
            id = "wen-";
        }
        if(i==3){
            id = "thu-";
        }
        if(i==4){
            id = "fri-";
        }
        let ordua = 9;
        for(j = 0; j<3; j++){
            
            let id_day = id + j;
            taula += "<a id='" +id_day+"' class='timing";
            if(bizikleta_okupazioa.includes(id_day)){
                taula += " okupata";
            }
            taula += "' href='#' onclick=aldatuData('"+id_day+"')><span>"+ordua+":00</span><span>AM</span></a>";
            ordua+=2;
        }
        taula += "</li>";
    }
    
    taula += "</ul></div></div></div>";
    
    contenido.innerHTML = taula;
}

function gehituOrdeSchedule(){
    // Get the day and month for each day of the week
    for (let i = 0; i < 7; i++) {
        const dayInfo = getDayAndMonth(i);
        
        //alert(`${dayInfo.day}, Day ${dayInfo.dayOfMonth} of ${dayInfo.month}`);
    }
    
    ordenagailu_okupazioa = JSON.parse(localStorage.getItem("ordenagailu_okupazioa"));
    
    let contenido = document.getElementById("day-slot");
    let egunak = "<ul><li class='left-arrow'><a href='#'><i class='fa fa-chevron-left'></i></a></li>";
    for (let i = 0; i < 7; i++) {
        const dayInfo = getDayAndMonth(i);
        egunak += "<li><span>"+dayInfo.day+"</span><span class='slot-date'>" + dayInfo.dayOfMonth + " " + dayInfo.month + " <small class='slot-year'>" + 2024 + "</small></span></li>";
    }
    egunak += "<li class='right-arrow'><a href='#'><i class='fa fa-chevron-right'></i></a></li></ul>";
    contenido.innerHTML = egunak;
    
    contenido = document.getElementById("schedule-cont");
    let taula = "<div class='row'><div class='col-md-12'><div class='time-slot'><ul class='clearfix'>";
    
    for(i = 0; i < 5; i++){
        taula += "<li>";
        let id = "";
        if(i==0){
            id = "mon-";
        }
        if(i==1){
            id = "tue-";
        }
        if(i==2){
            id = "wen-";
        }
        if(i==3){
            id = "thu-";
        }
        if(i==4){
            id = "fri-";
        }
        let ordua = 9;
        for(j = 0; j<1; j++){
            
            let id_day = id + j;
            taula += "<a id='" +id_day+"' class='timing";
            if(ordenagailu_okupazioa.includes(id_day)){
                taula += " okupata";
            }
            taula += "' href='#' onclick=aldatuData('"+id_day+"')><span>Aukeratu</span></a>";
            ordua+=2;
        }
        taula += "</li>";
    }
    
    taula += "</ul></div></div></div>";
    
    contenido.innerHTML = taula;
}

function gehituKotxeSchedule(){
    // Get the day and month for each day of the week
    for (let i = 0; i < 7; i++) {
        const dayInfo = getDayAndMonth(i);
        
        //alert(`${dayInfo.day}, Day ${dayInfo.dayOfMonth} of ${dayInfo.month}`);
    }
    
    kotxe_okupazioa = JSON.parse(localStorage.getItem("kotxe_okupazioa"));
    
    let contenido = document.getElementById("day-slot");
    let egunak = "<ul><li class='left-arrow'><a href='#'><i class='fa fa-chevron-left'></i></a></li>";
    for (let i = 0; i < 7; i++) {
        const dayInfo = getDayAndMonth(i);
        egunak += "<li><span>"+dayInfo.day+"</span><span class='slot-date'>" + dayInfo.dayOfMonth + " " + dayInfo.month + " <small class='slot-year'>" + 2024 + "</small></span></li>";
    }
    egunak += "<li class='right-arrow'><a href='#'><i class='fa fa-chevron-right'></i></a></li></ul>";
    contenido.innerHTML = egunak;
    
    contenido = document.getElementById("schedule-cont");
    let taula = "<div class='row'><div class='col-md-12'><div class='time-slot'><ul class='clearfix'>";
    
    for(i = 0; i < 5; i++){
        taula += "<li>";
        let id = "";
        if(i==0){
            id = "mon-";
        }
        if(i==1){
            id = "tue-";
        }
        if(i==2){
            id = "wen-";
        }
        if(i==3){
            id = "thu-";
        }
        if(i==4){
            id = "fri-";
        }
        let ordua = 9;
        for(j = 0; j<3; j++){
            
            let id_day = id + j;
            taula += "<a id='" +id_day+"' class='timing";
            if(kotxe_okupazioa.includes(id_day)){
                taula += " okupata";
            }
            taula += "' href='#' onclick=aldatuData('"+id_day+"')><span>"+ordua+":00</span><span>AM</span></a>";
            ordua+=2;
        }
        taula += "</li>";
    }
    
    taula += "</ul></div></div></div>";
    
    contenido.innerHTML = taula;
}