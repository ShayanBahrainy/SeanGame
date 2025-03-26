import Mellowtel from "mellowtel"

(async () => {
    const mellowtel = new Mellowtel("54288488")
    await mellowtel.initContentScript()
})();