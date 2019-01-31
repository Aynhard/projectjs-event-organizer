var cliens = [];
var events = [];

var client = {
    name : "",
    lastName : "",
    gendar : "",
    age : -1,
    amountMony : 0,
    vipPoints : 0
}

var systemIsClose = false;

function CloseSystem(){

    systemClosed=(true);
    
}

function getEvent(eventId){
    for (let index = 0; index < events.length; index++) {
        if(events[index].id===eventId){
            return{event : events[index],
                index:index
            };
        }      
    }
}


function pushEvent(name,access,date,price){
    if (systemIsClose){
        return;
    }
    let event = {};
    let eventId;
    if(events.length===0){
        eventId=0;
    }else{
        eventId=events[events.length-1].id+1;
    }
    if(access!=='undefined'){
        access=true;
    }
    if(typeof price ==='undefined'){
        price=0.00;
    }
   event.id=eventId;
   event.name=name;
   event.access=access;
   event.date=date;
   event.price=price;
   event.clients=[];


   events.push(event);
}
function edit(eventId,newName,NewAccess,date,price){
    let event = getEvent(eventId);
    if(typeof event ==='undefined'){
        console.log('Problem! Event isnt exist.');
        return;
    }
      event=event.event
    if(typeof newName!=='string'){
        console.log('Name is wrong')
        return;
    }
    event.name=newName;
    if(typeof NewAccess!=='boolean'){
        console.log('Problem with access!')
        return;
    }
    event.access=NewAccess;
    if (date instanceof Date){
        event.date=date;
    }
    if(typeof price ==='number'){
        event.price=price;
    }
 }

 function remove(eventId){
    let index=getEvent(eventId).index;    
    events.splice(index,1);
 }

 function kickClientFromAvent(event,client){
     let index = event.clients.indexOf(client);

     event.clients.splice(index,1);
 }

 function addClient(event,client){
    
    if(typeof client !=='object' || typeof event !=='object'){
        console.log('Wrong event or client!');
        return;
    }
    if(client.amountMony < event.price){
       console.log("Problem with money! Not enough availability !");
       return;
    }
    if(event.access){
        if (client.vipPoints<5){
            client.amountMony-=event.price;
            client.vipPoints++;
        }else{
            client.vipPoints=0;
        }
       event.clients.push(client);
    }else{
        
       if(client.age>=18){

        if (client.vipPoints<5){
            client.amountMony-=event.price;
            client.vipPoints++;
        }else{
            client.vipPoints=0;
        }
           event.clients.push(client);

       }else{
           console.log("Problem with age verification! The client is under the required.")
       }
    }
}

function getEventWithMostClient(){
    let arrayWithClientCount=[];
    for (let index = 0; index < events.length; index++) {
        arrayWithClientCount.push( {
            client : events[index].clients.length,
            index : index
           });
        
    }

    function compare(a,b) {
        if (a.client > b.client)
            return 1;
        if (a.client < b.client)
            return -1;
        return 0;
        }
        arrayWithClientCount.sort(compare);
    
    for (let index = 1; index < arrayWithClientCount.length; index++) {

       if(arrayWithClientCount[index].client===arrayWithClientCount[arrayWithClientCount.length-1].client){

           arrayWithClientCount=arrayWithClientCount.slice(index,arrayWithClientCount.length);

           break;
       }
    }
    if(arrayWithClientCount.length===events.length){
        console.log('all events are with equel count of clients');
    }else{
        console.log('Most popular event ! ');
        for (let index = 0; index < arrayWithClientCount.length; index++) {
            console.log(events[arrayWithClientCount[index].index]);
            
        }
    }
   
}

function listingEvents(){
    for (let index = 0; index < events.length; index++) {
        console.log(events[index]);
    }
}
//_________________________________________________________

// Add event
pushEvent('SicretsParty',true,new Date(),6.00);

pushEvent('GalaxyParty',true,new Date('02/05/2019'),8.00);

pushEvent('PlanetClubParty',true,new Date('02/21/2019'),10.00);

pushEvent('MegamiParty',true,new Date('03/18/2019'),4.00);

pushEvent('WGardenParty',true,new Date('04/28/2019'),15.00);

// Edit event
edit(2,'BedroomParty',false,new Date(),12.00);

// Remove event
remove(2);

// Add clients
var clientIcho = {
    name : "Hristo",
    lastName : "Ivanov",
    gendar : "male",
    age : 20,
    amountMony : 1000,
    vipPoints : 0
}

var clientPresa = {
    name : "Preslav",
    lastName : "Hristov",
    gendar : "mele",
    age : 23,
    amountMony : 400,
    vipPoints : 0
}

var clientGosho = {
    name : "Georgi",
    lastName : "Georgiev",
    gendar : "male",
    age : 19,
    amountMony : 20,
    vipPoints : 0
}

var clientIva = {
    name : "Ivelina",
    lastName : "Madjarova",
    gendar : "famale",
    age : 22,
    amountMony : 150,
    vipPoints : 0
}

// Add clients to events
addClient(events[0],clientPresa);
addClient(events[0],clientIcho);
addClient(events[0],clientIva);
addClient(events[1],clientGosho);
addClient(events[3],clientIva);

// Remove client from event
kickClientFromAvent(events[0],clientIcho);

// List all events
listingEvents();

// Show event with most clients
console.log("___________________________________");
getEventWithMostClient();

// Closing system
systemClosed= true;

// Trying to add event - false
pushEvent('Rock&Roll',true,new Date(),2.00);
