const form = document.querySelector('form');

form.addEventListener('submit', function(e){
    e.preventDefault();
    
    //Get input from User
    name = document.getElementById("name").value;
    const height = parseInt(document.querySelector('#height').value);
    const weight = parseInt(document.querySelector('#weight').value);
    const selection = document.getElementById("sel").value;
    const results = document.querySelector('#results');
    var strResult = new String();

    // Get date of the calculation
    var date = new Date();

    // Calculation Variable
    var pro;

    //Date String
    var strDate = date.toUTCString();

    //Calculation
    if (name.length === 0){
        results.innerHTML = "Please provide your name";      
    } else if((height === '') || (height < 0) || (isNaN(height))){
        results.innerHTML = "Please provide a valid height";
    } else if (weight === '' || weight < 0 || isNaN(weight)){
        results.innerHTML = "Please provide a valid weight";
    } else { 
        if(selection === "sedentary"){
            pro = (weight/2.2*0.8).toFixed(2);
            //display the results 
            strResult = "~ Require " + `<span>${pro}</span>` + " grams of protein daily." + `<br>` + "~ Record Date: " + date;
            results.innerHTML = strResult;
        }else if(selection === "endurance"){
            pro = (weight/2.2*1.4).toFixed(2);
            //display the results
            strResult = "~ Require " + `<span>${pro}</span>` + " grams of protein daily." + `<br>` + "~ Record Date: " + date;
            results.innerHTML = strResult;
        }else if(selection === "strength"){
            pro = (weight/2.2*1.8).toFixed(2);
            //display the results
            strResult = "~ Require " + `<span>${pro}</span>` + " grams of protein daily." + `<br>` + "~ Record Date: " + date;
            results.innerHTML = strResult;
        }
        
    }

    //Create Object to store all data
    var person = {
        personHeight: height,
        personWeight: weight,
        personSelection: selection,
        personDate: strDate,
        personPro: pro
    }; 

    
    // Array to Store User Data - Array contain Objects
    var userData = [];

    //Check for User info
    if (localStorage.getItem(name) !== null){
        userData = JSON.parse(localStorage.getItem(name)); 
    }

    //Add Object Data into Array
    userData.push(person);

    // Store Array to LocalStorage
    localStorage.setItem(name, JSON.stringify(userData));


    /**VIEW HISTORY**/
    // Set up History Button
    let button = document.getElementById("history-button");
    button.addEventListener("click", viewHistory);

    //Take an Array and Show its contain
    function viewHistory(array){
        //Get User Data by Name
        var retrieveData = JSON.parse(localStorage.getItem(name));
        console.log(retrieveData.length);

        //Get Table ID
        var table = document.getElementById("myTable");
       
        //Loop and Print All Data
        for(i = 0; i < retrieveData.length; i++){
            //Get Data from local storage
            var buffer = retrieveData[i];

            //Insert to table       
            var row = table.insertRow(); 
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);


            cell1.innerHTML = "Height: " + buffer.personHeight + "(cm)___";
            cell2.innerHTML = "Weight: " + buffer.personWeight + "(lbs)___";
            cell3.innerHTML = "Record: " + buffer.personPro + "(protein) needed___";
            cell4.innerHTML = "Date: " + buffer.personDate;

        }
    } 
    
}); 






