const clickButton   =   document.getElementById("button");

const displayDiv    =   document.getElementById("display");
const buttondiv     =   document.querySelector(".buttonDiv");

clickButton.addEventListener("click",function (e){
    e.preventDefault();     
    buttondiv.classList.add("movedButton");     //adding movedButton class for moving the button upside after click
    

    displayDiv.style.display    =   "block";        //Display the hidden output block 
    displayDiv.innerHTML    =   "<p>Result will be available after 5 sec....</p>";    //display waiting message after button click
    
    const fetchdata     =   new Promise((resolve,reject) => {      //creating promise for fetching data

        const timeout   =   setTimeout(() => {          //setTimeout callback function for timeout setup
            reject('Operation timed Out.');
        },5000);

        fetch('https://dummyjson.com/posts')    //fetching data from API
            .then(result => {
                clearTimeout(timeout);      //clear timeout if data is fetched
                if(!result.ok){                     //check if response is valid
                    throw new error('Network response was not Ok');
                }
                return result.json();           //return the fetch data into JSON format                
            })      
            .then(data => {                     
                resolve(data);              //resolve the promise with fetch data
            })
            .catch(err => {                     //error handling block
               reject(err.message);    
            })
    })
    

    fetchdata.then(data => {
        // displayDiv.textContent  =   JSON.stringify(data.posts);
        const titles = data.posts.map(post => post.title).join('<br>'); //Extract title and format of data
        displayDiv.innerHTML    =  `<p>${titles}</p>`;  //Display the data
    })
    .catch(message => {
        displayDiv.textContent  =   message;        //display error message
    }) 
  
  
})