window.onload = function () {

  function togle() {
    (function($) {
      $("#logo").toggleClass("active");
      $("#go").toggleClass("active");
    })(jQuery);
  }

  window.setTimeout(togle, 1000);

  init();

};

let model, webcam, maxPredictions;
const button = document.getElementById("go");

// Load the image model and setup the webcam
async function init() {
  const modelURL = "./tm-my-image-model/" + "model.json";
  const metadataURL = "./tm-my-image-model/" + "metadata.json";

  model = await tmImage.load(modelURL, metadataURL);
  maxPredictions = model.getTotalClasses();

  // Convenience function to setup a webcam
  const flip = true; // whether to flip the webcam
  webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
  await webcam.setup();
    // request access to the webcam
  await webcam.play();
  window.requestAnimationFrame(loop);

  // append elements to the DOM
  document.getElementById("webcam-container").appendChild(webcam.canvas);
}

async function loop() {
  webcam.update(); // update the webcam frame
  var probability_1 = await predict_1();
  var probability_2 = await predict_2();
  if (probability_1 >= 0.995 || probability_2 >= 0.995) {
    button.disabled = false;
  } else {
    button.disabled = true;
  }
  window.requestAnimationFrame(loop);


  document.getElementById("go").addEventListener("click", function () {

    if(probability_1 > 0.995 && probability_2 < 0.2) {
      console.log(probability_1)
      // location.replace("./mainDash.html");
      document.location.href= "./Dash/mainDash.html";
    } else if (probability_2 > 0.995 && probability_1 < 0.2){
      console.log(probability_2)
      // location.replace("./mainDash_2.html");
      document.location.href= "./Dash/mainDash_2.html";
    }

  });

}



// run the webcam image through the image model
async function predict_1() {
  // predict can take in an image, video or canvas html element
  const prediction = await model.predict(webcam.canvas);
  return prediction[0].probability;
}

async function predict_2() {
  // predict can take in an image, video or canvas html element
  const prediction = await model.predict(webcam.canvas);
  return prediction[1].probability;
}
