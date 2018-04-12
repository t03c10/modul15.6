class Stopwatch {
    constructor(display) {
        this.running = false;
        this.display = display;
        this.reset();
        this.print(this.times);
    }

    reset() {
        this.times = {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        };
    }

    print() {
        this.display.innerText = this.format(this.times);
    }
    format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
    }

    start() {
        if (!this.running) {
            this.running = true;
            this.watch = setInterval(() => this.step(), 10);
            console.log(this.format(this.times));
            console.log("start");
        }
    }

    step() {
        if (!this.running) return;
        this.calculate();
        this.print();
    }

    calculate() {
        this.times.miliseconds += 1;
        if (this.times.miliseconds >= 100) {
            this.times.seconds += 1;
            this.times.miliseconds = 0;
        }
        if (this.times.seconds >= 60) {
            this.times.minutes += 1;
            this.times.seconds = 0;
        }
    }

    stop() {
        this.running = false;
        clearInterval(this.watch);
        console.log("stop");
    }

    tReset() {
        this.stop();
        this.reset();
        this.print();
        console.log("reset");
    }

    save() {
        let resultTime = document.getElementById('stopwatch').innerHTML;
        console.log(resultTime);
        const resultHeader = document.getElementById('resultsHead');
        const resultList = document.createElement('li');
        const singleResult = document.createTextNode(resultTime);

        resultHeader.innerHTML = "<h3>Saved results</h3>";
        resultList.appendChild(singleResult);
        document.getElementById('results').appendChild(resultList);
    }
}

function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

const stopwatch = new Stopwatch( //instancja
    document.querySelector('.stopwatch'));

let startButton = document.getElementById('start'); //metoda
startButton.addEventListener('click', () => stopwatch.start());

let stopButton = document.getElementById('stop'); //metoda
stopButton.addEventListener('click', () => stopwatch.stop());

let resetButton = document.getElementById('reset'); //metoda 
resetButton.addEventListener('click', () => stopwatch.tReset());

let saveButton = document.getElementById('save');
saveButton.addEventListener('click', () => stopwatch.save());