return new Promise(function (resolve,rejection) {
    window.document.onpageview = resolve
})