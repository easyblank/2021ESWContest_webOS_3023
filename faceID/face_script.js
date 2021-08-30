window.onload = function () {


    function togle() {
      (function($) {
        $("#logo").toggleClass("active");
        $("#go").toggleClass("active");
      })(jQuery);
    }

    window.setTimeout(togle, 1000);

    init();

    document.getElementById("go").addEventListener("click", function () {
      location.replace("./mainDash.html");
    });

    // button.addEventListener("click", function () {
    //   // location.replace("./clark-master/index.html");
    //   location.replace("./mainDash.html");
    // });
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

    for (let i = 0; i < maxPredictions; i++) {
      // and class labels

      // jiwon
      // const classPrediction = prediction[i].className + ": " + prediction[i].probability.toFixed(2);
      // labelContainer.childNodes[i].innerHTML = classPrediction;
    }
  }

  async function loop() {
    webcam.update(); // update the webcam frame
    var probability = await predict();
    if (probability >= 0.95) {
      button.disabled = false;
    } else {
      button.disabled = true;
    }
    window.requestAnimationFrame(loop);
  }

  // run the webcam image through the image model
  async function predict() {
    // predict can take in an image, video or canvas html element
    const prediction = await model.predict(webcam.canvas);
    return prediction[0].probability;
  }
