console.log("script loaded");

class Btn {
    constructor(btn) {
        this.btn = btn;
        this.count = 0;
    }
    inc() {//increase the counters
        this.count++;
        this.btn.innerText = this.count;//the display
        console.log(this.count);
    }
    dec() {//decrease the counters
        this.count--;
        this.btn.innerText = this.count;//the display
        console.log(this.count);
    }
    reset() {//reset the counters
        this.count=0;
        this.btn.innerText = this.count;
        console.log(this.count);
    }
    event(){//add events to the counters
        this.btn.addEventListener('click', () => {//whe
            this.inc();
        });
        this.btn.addEventListener('keydown', () => {
            this.dec();
        });
        this.btn.addEventListener('wheel', () => {
            this.reset();
        });

    }
}

let counter1 = new Btn(document.querySelector('#btn1'));
let counter2= new Btn(document.querySelector('#btn2'));
let counter3 = new Btn(document.querySelector('#btn3'));
counter1.event();
counter2.event();
counter3.event();

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