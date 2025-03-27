import Mellowtel from "mellowtel";

let mellowtel;

(async () => {
    mellowtel = new Mellowtel("54288488"); // Replace with your configuration key
    await mellowtel.initBurke();
})();