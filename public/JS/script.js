let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

const calendar = document.getElementById('calendar');
const newEventModal = document.getElementById('newEventModal');
const deleteEventModal = document.getElementById('deleteEventModal');
const backDrop = document.getElementById('modalBackDrop');
const eventTitleInput = document.getElementById('eventTitleInput');
const calDate = document.getElementById('calDate');
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function openModal(date) {
  clicked = date;

  const eventForDay = events.find(e => e.date === clicked);

  if (eventForDay) {
    document.getElementById('eventText').innerText = eventForDay.title;
    deleteEventModal.style.display = 'block';
  } else {
    newEventModal.style.display = 'block';
    calDate.innerHTML += `<input type="hidden" name="dateAvailability" id="dateAvailability" value="${date}"/>`
  }
  backDrop.style.display = 'block';
}

function load() {
  const dt = new Date();

  if (nav !== 0) {
    dt.setMonth(new Date().getMonth() + nav);
  }

  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const dateString = firstDayOfMonth.toLocaleDateString('en-gb', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

  document.getElementById('monthDisplay').innerText = 
    `${dt.toLocaleDateString('en-GB', { month: 'long' })} ${year}`;

  calendar.innerHTML = '';

  for(let i = 1; i <= paddingDays + daysInMonth; i++) {
    const daySquare = document.createElement('div');
    daySquare.classList.add('day');

    const dayString = `${year}/${month + 1}/${i - paddingDays}`;

    if (i > paddingDays) {
      daySquare.innerText = i - paddingDays;

      const eventForDay = events.find(e => e.date === dayString);

      // this array will store all the friends available on this day
      let freeFriends = [];

      if (eventForDay) {
        freeFriends.push("You");
      }
      
      // for each friend that is free on this day, add them to the list
      // JSON.parse(x) would convert a string into a json object. For example, 
      // if x is the string "{name: 'dave', age : 20}" we cannot do x.name. To use x like a JSON
      // object we must convert it to one using

      // the availability of different friends is stored in the localStorage
      let friendAvailability = JSON.parse(localStorage.getItem('friendAvailability'))
      friendAvailability.forEach(e => {
        let availability = e.dateAvailability;
            if (availability.find(x => x.date === dayString)) {
              freeFriends.push(e.name);
            }
       
      });
      
      if (i - paddingDays === day && nav === 0) {
        daySquare.id = 'currentDay';
        }

        // for each free friend we will create a div and put their name inside
        // We will then add this friend to the daySquare div
        let freeDiv;
        if (freeFriends.length > 0 ) {
          freeDiv = document.createElement('div');
          freeFriends.forEach(element => {
            let nameDiv = document.createElement('div');
            nameDiv.className = "availableName",
            nameDiv.innerText = element;
            freeDiv.appendChild(nameDiv);
          });

          daySquare.appendChild(freeDiv);
        }

      daySquare.addEventListener('click', () => openModal(dayString));

    } else {
      daySquare.classList.add('padding');
    }

    calendar.appendChild(daySquare);    
  }
}

function closeModal() {
  eventTitleInput.classList.remove('error');
  newEventModal.style.display = 'none';
  deleteEventModal.style.display = 'none';
  backDrop.style.display = 'none';
  eventTitleInput.value = '';
  clicked = null;
  load();
}

function saveEvent() {
  if (eventTitleInput.value) {
    eventTitleInput.classList.remove('error');

    events.push({
      date: clicked,
      title: 'YOU ',
    });

    localStorage.setItem('events', JSON.stringify(events));
    closeModal();
  } else {
    eventTitleInput.classList.add('error');
  }
}

function deleteEvent() {
  events = events.filter(e => e.date !== clicked);
  localStorage.setItem('events', JSON.stringify(events));
  closeModal();
}

function initButtons() {
  document.getElementById('nextButton').addEventListener('click', () => {
    nav++;
    load();
  });

  document.getElementById('backButton').addEventListener('click', () => {
    nav--;
    load();
  });

  document.getElementById('saveButton').addEventListener('click', saveEvent);
  document.getElementById('cancelButton').addEventListener('click', closeModal);
  document.getElementById('deleteButton').addEventListener('click', deleteEvent);
  document.getElementById('closeButton').addEventListener('click', closeModal);
}

initButtons();
load();