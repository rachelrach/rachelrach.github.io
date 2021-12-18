let users = JSON.parse(localStorage.getItem('allUsers'));
let currentAccount = JSON.parse(localStorage.getItem('currentAccount'));
let modal = document.getElementById('blackOut');
if (localStorage.getItem('allUsers') == null) {
    users = []; //set array of account
}
if (localStorage.getItem('currentAccount') == null) {
    currentAccount = ""; //set  account
}

modal.addEventListener('click', () => {
    modal.remove();
    logInBlock.remove();
    signUpBlock.remove();
});

let alert = document.getElementById('alert');
console.log(alert);

localStorage.setItem('allUsers', JSON.stringify(users));
let logIn = document.getElementById("submitIn"); //get the log in
let signUp = document.getElementById("submitUp");
let moveToSignUp = document.getElementById('moveToSignUp'); //get the sign up
let moveToLogIn = document.getElementById('moveToLogIn');

let logInBlock = document.getElementById('logIn');
let signUpBlock = document.getElementById('signUp');

let blackOut = document.getElementById('blackOut');
if (localStorage.getItem('currentAccount') != null) {
    logInBlock.remove();
    signUpBlock.remove();
    blackOut.remove();
    document.getElementById('helloName').innerText = "שלום " + currentAccount;

}
let inGame = false;
signUpBlock.remove();
console.log(signUpBlock);
console.log(logIn);
logInFunc();
goToSignUp();
signUpFunc();
goToLogIn();


function goToLogIn() {
    moveToLogIn.addEventListener('click', () => {

        document.body.append(logInBlock);
        signUpBlock.remove();
    })
}

function goToSignUp() {
    moveToSignUp.addEventListener('click', () => {
        document.body.append(signUpBlock);
        logInBlock.remove();
    })
}

function signUpFunc() { //in case of clicking sign up

    signUp.addEventListener('click', () => {

        let account1 = new creatAccount(document.getElementById('userNameUp').value, document.getElementById('userMailUp').value, document.getElementById('userPasswordUp').value); //create new account
        let name = document.getElementById('userNameUp').value;
        if (isAccountExist(name)) {

            document.body.append(logInBlock);
            signUpBlock.remove();
            document.getElementById('announce').innerText = "הנך רשום כבר";

            alert.classList.add('animAlert');
            setTimeout(() => {
                alert.classList.remove('animAlert');
            }, 5000);
            //log in visible sign up invisible and alert of need to log in
            currentAccount = name;
            localStorage.setItem('currentAccount', JSON.stringify(currentAccount));
        } else {

            if (document.getElementById('userMailUp').value === "" || document.getElementById('userNameUp').value === "" || document.getElementById('userPasswordUp').value === "") {
                document.getElementById('announce').innerText = "יש למלא את כל הפרטים";
                alert.classList.add('animAlert');
                setTimeout(() => {
                    alert.classList.remove('animAlert');
                }, 5000);
            } else {
                users.push(account1); //add account to users
                localStorage.setItem('allUsers', JSON.stringify(users)); //store it in the storage
                let show = JSON.parse(localStorage.getItem("allUsers")); //get it back from storage for checking
                console.log(show);
                currentAccount = account1.name;
                console.log(currentAccount);
                inGame = true;
                logInBlock.remove();
                signUpBlock.remove();
                blackOut.remove();
                //log in and sign up invisible/
                currentAccount = name;
                localStorage.setItem('currentAccount', JSON.stringify(currentAccount));
                document.getElementById('helloName').innerText = "שלום " + currentAccount;

            }

        }
    })
}

function creatAccount(name, email, password) { //creat account
    this.name = name;
    this.email = email;
    this.password = password;
    this.score = 0;
}

function isAccountExist(currentName) { //check if account name exist in the array return true/false
    getArray = JSON.parse(localStorage.getItem('allUsers')); //get the array from storage
    return getArray.find(({
        name
    }) => { //look for the name in the array and return true/false
        return (name == currentName);
    });

}


function logInFunc() { //clicked log in

    logIn.addEventListener('click', () => {
        let name = document.getElementById("userNameIn").value;
        if (isAccountExist(name)) { //if account exist
            if (comparePsd()) {
                console.log(name);
                currentAccount = name;
                logInBlock.remove();
                signUpBlock.remove();
                blackOut.remove();

                //log in and sign up invisible/
                inGame = true;
                currentAccount = name;
                localStorage.setItem('currentAccount', JSON.stringify(currentAccount));
                document.getElementById('helloName').innerText = "שלום " + currentAccount;


            } else {
                //anounce that change details or sign up
                document.getElementById('announce').innerText = "הסיסמה שגויה";
                alert.classList.add('animAlert');
                setTimeout(() => {
                    alert.classList.remove('animAlert');
                }, 5000);
            }
        } else {
            //anounce that change details or sign up
            document.getElementById('announce').innerText = " שם המשתמש אינו קיים יש לשנות פרטים או להרשם";
            alert.classList.add('animAlert');
            setTimeout(() => {
                alert.classList.remove('animAlert');
            }, 5000);
        }
    })
}

function comparePsd() {
    currentPsd = document.getElementById('userPasswordIn').value;
    getArray = JSON.parse(localStorage.getItem('allUsers')); //get the array from storage
    return (getArray.find(({
        password
    }) => { //look for the password in the array
        return (password == currentPsd);
    }))
}



function showPsd1() {
    let x = document.getElementById("userPasswordIn");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

function showPsd2() {
    let x = document.getElementById("userPasswordUp");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

console.log(currentAccount);

function winAnim(){
    
}