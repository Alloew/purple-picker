function hslToHex(h, s, l) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}

const purpleHue = 285;
const toleranceUp = 15;
const toleranceDown = 20;
const minHue = purpleHue - toleranceDown;
const maxHue = purpleHue + toleranceUp;

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const btn = document.getElementById("btn");
const shareBtn = document.getElementById("shareBtn");
const preview = document.getElementById("preview");
const info = document.getElementById("info");

let url = new URL(window.location);
let h = url.searchParams.get("h") ? url.searchParams.get("h") : 300;
let s = url.searchParams.get("s") ? url.searchParams.get("s") : 100;
let l = url.searchParams.get("l") ? url.searchParams.get("l") : 25;
url.searchParams.set("h", h);
url.searchParams.set("s", s);
url.searchParams.set("l", l);

window.addEventListener("load", () => {
    let color = `hsl(${h}, ${s}%, ${l}%)`;

    preview.style.background = color;
    var left = document.createElement("span");
    left.innerText = hslToHex(h, s, l);
    var right = document.createElement("span");
    right.innerText = color;
    preview.innerHTML = "";
    preview.appendChild(left);
    preview.appendChild(right);
})

btn.addEventListener("click", () => {
    h = random(minHue, maxHue);
    s = random(12, 100);
    l = random(5, 91);
    let color = `hsl(${h}, ${s}%, ${l}%)`;

    url.searchParams.set("h", h);
    url.searchParams.set("s", s);
    url.searchParams.set("l", l);

    var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + `${url.search}`;
    window.history.pushState({ path: newurl }, '', newurl);

    preview.style.background = color;
    var left = document.createElement("span");
    left.innerText = hslToHex(h, s, l);
    var right = document.createElement("span");
    right.innerText = color;
    preview.innerHTML = "";
    preview.appendChild(left);
    preview.appendChild(right);
});

shareBtn.addEventListener("click", () => {
    const popup = new Popup({
        id: "shareUrl",
        title: "Share Url",
        content: `<a href="${url}">${url}</a>`,
    });

    popup.show();
});