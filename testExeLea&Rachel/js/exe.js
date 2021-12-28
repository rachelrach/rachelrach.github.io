console.log("script loaded");
class Question {
    constructor(codeQtn, textQtn, numQtn, score) {
        this.codeQtn = codeQtn;
        this.textQtn = textQtn;
        this.textAns;
        this.numQtn = numQtn;
        this.score = score;
    }
    isAnswered() {
        if (this.textAns !== null) {
            return true;
        } else {
            return false;
        }
    }
    getScore() {
        if (this.isAnswered()) {
            return this.score;
        } else {
            return this.score * -1;
        }
    }
}

class Test {

    constructor(codeText, list) {
        this.codeText = codeText;
        this.list = list;
        this.name;
        this.start;
        this.time = 60;
    }
    startTest(name) {
        this.name = name;
        const d= new Date();
        this.start = d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
    }
    getOrderredQuestions() {
        for (let i = 1; i < this.list.length; i++) {
            let temp = this.list[i];
            let j = i - 1;
            while (j >= 0 && this.list[j].numQtn > temp.numQtn) {
                this.list[j + 1] = this.list[j];
                j = j - 1;
            }
            this.list[j + 1] = temp;
        }
    }
}

let qtn1 = new Question(1, "why it's rainy?", 1, 25);
let qtn2 = new Question(2, "what did you do in the project?", 2, 25);
let qtn3 = new Question(3, "did you enjoy?", 3, 25);
let qtn4 = new Question(4, "did Ditsa check the quizes?", 4, 25);

let test1=new Test(1,[qtn2, qtn1, qtn3, qtn4]);
test1.getOrderredQuestions();
test1.startTest("Rachel");
console.log(test1);
console.log(test1.list[0].textQtn);
console.log(" ");
console.log(test1.list[1].textQtn);
console.log(" ");
console.log(test1.list[2].textQtn);
console.log(" ");
console.log(test1.list[3].textQtn);
console.log(" ");

