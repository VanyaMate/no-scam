import Browser, { tabs } from "webextension-polyfill";

const titleOutput = document.querySelector<HTMLHeadingElement>('h1')!;
const timerSelect = document.querySelector<HTMLSelectElement>('select')!;
const startTimerButton = document.querySelector<HTMLButtonElement>('button')!;

let interval: ReturnType<typeof setInterval> = 0;
let time: number = 0;
let previousTime: number = 0;

const buttonClickHandler = function () {
    clearInterval(interval);
    time = 0;
    previousTime = Date.now();

    const timerValue = timerSelect.value;
    const timerInMs = Number(timerValue) * 60 * 1000;
    interval = setInterval(intervalHandler, 1000, timerInMs);
}

const intervalHandler = function (timerInMs: number) {
    const deltaTime = Date.now() - previousTime;
    time += deltaTime;
    previousTime = Date.now();

    if (time >= timerInMs) {
        finishTimerHandler();
        clearInterval(interval)
        titleOutput.textContent = '00:00';
    } else {
        const remainingTimeMs = timerInMs - time;
        const remainingTimeSeconds = Math.floor(remainingTimeMs / 1000);
        const remainingMinutes = Math.floor(remainingTimeSeconds / 60);
        const remainingSeconds = remainingTimeSeconds % 60;
        titleOutput.textContent = `${remainingMinutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
}

const finishTimerHandler = async function () {
    const currentWindows = await Browser.windows.getCurrent();
    Browser.windows.remove(currentWindows?.id ?? 0);
}

startTimerButton.addEventListener('click', buttonClickHandler);