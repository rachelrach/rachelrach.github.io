let changeUser = document.getElementById('changeUser');

console.log(changeUser);
changeUserFunc();

function changeUserFunc() {
    changeUser.addEventListener('click', () => {
        document.body.append(logInBlock);
        document.body.append(blackOut);
    })
}