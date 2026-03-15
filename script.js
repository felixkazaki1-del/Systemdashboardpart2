
let alters = JSON.parse(localStorage.getItem("alters")) || [];
let history = JSON.parse(localStorage.getItem("history")) || [];
let friends = JSON.parse(localStorage.getItem("friends")) || [];
let front = localStorage.getItem("front");

function save(){
localStorage.setItem("alters",JSON.stringify(alters));
localStorage.setItem("history",JSON.stringify(history));
localStorage.setItem("friends",JSON.stringify(friends));
localStorage.setItem("front",front);
}

function toggleSidebar(){
document.getElementById("sidebar").classList.toggle("open");
}

function showPage(page){
["dashboard","alters","timeline","friends","journal"].forEach(p=>{
document.getElementById(p).style.display="none";
});
document.getElementById(page).style.display="block";
}

function renderAlters(){
const list=document.getElementById("alterList");
list.innerHTML="";

alters.forEach((a,i)=>{

const div=document.createElement("div");

div.innerHTML=`
<img src="${a.avatar}" class="avatar">
<b>${a.name}</b> (${a.role})
<button onclick="setFront(${i})">Front</button>
`;

list.appendChild(div);
});
}

function setFront(i){
front=alters[i].name;
history.unshift(front+" fronted at "+new Date().toLocaleString());
document.getElementById("frontName").innerText=front;
document.getElementById("frontAvatar").src=alters[i].avatar;
save();
renderHistory();
}

function addAlter(){

const name=document.getElementById("nameInput").value;
const role=document.getElementById("roleInput").value;
const file=document.getElementById("avatarInput").files[0];

if(!file||!name)return;

const reader=new FileReader();

reader.onload=e=>{

alters.push({
name:name,
role:role,
avatar:e.target.result
});

save();
renderAlters();

};

reader.readAsDataURL(file);
}

function renderHistory(){

const box=document.getElementById("history");
box.innerHTML="";

history.forEach(h=>{
const div=document.createElement("div");
div.innerText=h;
box.appendChild(div);
});
}

function addFriend(){

const name=document.getElementById("friendNameInput").value;
if(!name)return;

friends.push(name);
save();
renderFriends();

}

function renderFriends(){

const box=document.getElementById("friendList");
box.innerHTML="";

friends.forEach(f=>{
const div=document.createElement("div");
div.innerText=f;
box.appendChild(div);
});
}

function journal(){

const box=document.getElementById("journalBox");
box.value=localStorage.getItem("journal")||"";

box.addEventListener("input",()=>{
localStorage.setItem("journal",box.value);
});

}

renderAlters();
renderHistory();
renderFriends();
showPage("dashboard");
journal();
