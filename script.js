const admins = document.querySelector(".admins");
const developers = document.querySelector(".developers");
const selectProfession = document.querySelector("select");
const filterButton = document.querySelector(".filter");
const toggleButton = document.querySelector(".toggle");
const form = document.querySelector("form");
const name = document.querySelector("#name");
const profession = document.querySelector("#profession");
const age = document.querySelector("#age");
const error = document.querySelector(".error");

let userDetails = [
  { id: 1, name: "john", age: "18", profession: "developer" },
  { id: 2, name: "jack", age: "20", profession: "developer" },
  { id: 3, name: "karen", age: "19", profession: "admin" },
];

userDetails.forEach(addToList);

filterButton.addEventListener("click", filterByProfession);

function filterByProfession(event) {
  // reset
  developers.innerText = "";
  admins.innerText = "";
  let profession = selectProfession.value;

  if (profession == "") {
    alert("Please select a Profession to Filter");
    userDetails.forEach(addToList);
  } else if (profession == "developer") {
    // only show developers
    const allDevelopers = userDetails.filter(onlyDevelopers);
    allDevelopers.forEach(addToList);
  } else if (profession == "admin") {
    // only show admins
    const allAdmins = userDetails.filter(onlyAdmins);
    allAdmins.forEach(addToList);
  }
}
function addToList(employee) {
  let { name, profession, age } = employee;
  name = name[0].toUpperCase() + name.slice(1);
  profession = profession[0].toUpperCase() + profession.slice(1);

  let listElement = document.createElement("li");

  listElement.innerHTML = `<span>Name: ${name}</span><span>Profession: ${profession}</span><span>Age: ${age}</span>`;

  if (profession == "Admin") {
    // add to admin list
    admins.append(listElement);
  } else if (profession == "Developer") {
    // add to developer list
    developers.append(listElement);
  }
}
function onlyDevelopers(employee) {
  return employee.profession == "developer";
}
function onlyAdmins(employee) {
  return employee.profession == "admin";
}
form.addEventListener("submit", addUser);
function addUser(event) {
  event.preventDefault();

  let validInputs =
    profession.value.trim().length &&
    name.value.trim().length &&
    age.value.trim().length;

  // only two professions allowed
  let validProfession =
    profession.value.toLowerCase() == "admin" ||
    profession.value.toLowerCase() == "developer";
  if (!validInputs) {
    error.innerText = "Please make sure inputs values are valid";
  } else if (!validProfession) {
    error.innerText = "Only Admin and Developer as profession allowed";
  } else {
    const id = userDetails.length + 1;
    const user = {
      id,
      name: name.value,
      age: age.value,
      profession: profession.value.toLowerCase(),
    };

    userDetails.push(user);
    console.log(userDetails);
    addToList(user);

    // form and error reset
    name.value = "";
    profession.value = "";
    age.value = "";
    error.innerText = "";
  }
}

toggleButton.addEventListener("click", changeTheme);

function changeTheme(event) {
  document.body.classList.toggle("bg-light");
  document.body.classList.toggle("bg-dark");
}
