let clickCam = document.getElementById('safety-cam');
let exit = document.getElementById('exit');
let showCam = document.getElementById('show-cam');
let defaultPage = document.getElementById('default');


clickCam.addEventListener('click', () => {
    console.log("default")
    defaultPage.setAttribute('style', 'display:none');
    showCam.setAttribute('style', ' ');

});

exit.addEventListener('click', () => {
    console.log("clicked")
    showCam.setAttribute('style', 'display:none');
    defaultPage.setAttribute('style', ' ');
});