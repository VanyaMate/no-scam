import { Observer } from "./observer/Observer";

const html = document.querySelector('html');
if (html) {
    const observer = new Observer({ childList: true });
    observer.setTarget(html);
    observer.setCallback(() => {
        const body = html.querySelector('body:not(.no-scam)');
        if (body) {
            body.classList.add('no-scam');
        }
    })
    observer.observe();
}