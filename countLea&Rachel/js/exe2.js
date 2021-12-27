console.log("script loaded");

let btn1 = document.querySelector('#btn1');
let btn2 = document.querySelector('#btn2');
let btn3 = document.querySelector('#btn3');

btn1.addEventListener('click', () => {
    counter1.inc();
});
btn2.addEventListener('click', () => {
    counter2.inc();
});
btn3.addEventListener('click', () => {
    counter3.inc();
});
btn1.addEventListener('keydown', () => {
    counter1.dec();
});
btn2.addEventListener('keydown', () => {
    counter2.dec();
});
btn3.addEventListener('keydown', () => {
    counter3.dec();
});
btn1.addEventListener('wheel', () => {
    counter1.reset();
});
btn2.addEventListener('wheel', () => {
    counter2.reset();
});
btn3.addEventListener('wheel', () => {
    counter3.reset();
});

class Btn {
    constructor(btn) {
        this.btn = btn;
        this.count = 0;
    }
    inc() {
        this.count++;
        this.btn.innerText = this.count;
        console.log(this.count);
    }
    dec() {
        this.count--;
        this.btn.innerText = this.count;
        console.log(this.count);
    }
    reset() {
        this.count=0;
        this.btn.innerText = this.count;
        console.log(this.count);
    }
}
let counter1 = new Btn(btn1);
let counter2= new Btn(btn2);
let counter3 = new Btn(btn3);

console.log(counter1);


// function counter(btn) {
    //     this.btn = btn;
    //     this.count = 0;
    // }
    // let counter1 = new counter(btn1);
    // console.log(counter1);
    // counter.prototype.inc = function () {
    //     this.count++;
    //     this.btn.innerText = this.count;
    //     console.log(this.count);
    // }