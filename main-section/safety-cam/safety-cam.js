let clickCam = document.getElementById('safety-cam');
let exit = document.getElementById('exit');
let camOn = document.getElementById('cam-on');
let showCam = document.getElementById('show-cam');
let defaultPage = document.getElementById('default');


clickCam.addEventListener('click', () => {

    console.log("default")
    defaultPage.setAttribute('style', 'display:none');
    showCam.setAttribute('style', ' ');
    camOn.setAttribute('src','http://192.168.0.105:81/stream');

});

exit.addEventListener('click', () => {
    console.log("clicked")
    showCam.setAttribute('style', 'display:none');
    defaultPage.setAttribute('style', ' ');
    camOn.setAttribute('src',' ')
});