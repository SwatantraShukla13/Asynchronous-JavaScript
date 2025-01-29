const clickButton   =   document.getElementById("button");

const displayDiv    =   document.getElementById("display");
const buttondiv     =   document.querySelector(".buttonDiv");

function simulateDelay(callback){
    setTimeout(callback,5000);  //5 sec delay
} 

function fetchdata(){
    fetch('https://dummyjson.com/posts')    //fetching data from API
        .then(result => result.json())      //Parse the fetch data into JSON format
        .then(data => {                     //process the JSON Data
            const titles = data.posts.map(post => post.title).join('<br>'); //Extract title and format of data
            displayDiv.innerHTML    =  `<p>${titles}</p>`;  //Display the data
        })
        .catch(err => {
            displayDiv.innerHTML = `Error fetching data: <br> ${err}`;//Display the error and error type
            console.error('Error:',err);    //logging the error
        })
}

clickButton.addEventListener("click",function (e){
    e.preventDefault();     
    buttondiv.classList.add("movedButton");     //adding movedButton class for moving the button upside after click
    

    displayDiv.style.display    =   "block";        //Display the hidden output block 
    displayDiv.innerHTML    =   "<p>Callback executed result will be available after 5 sec....</p>";    //display message after button click
    simulateDelay(() =>  fetchdata() ); //call simulateDelay callback function & inside SimulateDelay call fetchdata
  
});