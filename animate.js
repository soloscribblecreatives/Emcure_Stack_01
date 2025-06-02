function runAnimation() {
  window.requestAnimationFrame(function () {

    const topCanvas = document.getElementById('topCanvas');
    const bottomCanvas = document.getElementById('bottomCanvas');
    const topCtx = topCanvas.getContext('2d');
    const bottomCtx = bottomCanvas.getContext('2d');
    const width = topCanvas.width;
    const height = topCanvas.height;

    const topImage = new Image();
    const bottomImage = new Image();

    topImage.src = 'slide1/top.png'; // Replace with your top image path
    bottomImage.src = 'slide1/bottom.png'; // Replace with your bottom image path

    let isDrawing = false;
    let revealed = false;

    function getPosition(e) {
      const rect = topCanvas.getBoundingClientRect();
      if (e.touches) {
        return {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top
        };
      } else {
        return {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        };
      }
    }

    function draw(e) {
      if (!isDrawing) return;
      e.preventDefault();
      const pos = getPosition(e);
      topCtx.globalCompositeOperation = 'destination-out';
      topCtx.beginPath();
      topCtx.arc(pos.x, pos.y, 100, 0, Math.PI * 2);  //80 is the size of the amount of scratch
      topCtx.fill();
    }

    function checkReveal() {
      const imageData = topCtx.getImageData(0, 0, width, height);
      let clearPixels = 0;
      for (let i = 0; i < imageData.data.length; i += 4) {
        if (imageData.data[i + 3] === 0) {
          clearPixels++;
        }
      }
      const percent = clearPixels / (width * height);
      if (percent > 0.15 && !revealed) {  //0.95 detects 95% of the pixels scratched and then triggers any event
        revealed = true;
        setTimeout(function(){
			go_nav('f');
		}, 2000);
      }
    }

    function startDrawing(e) {
      isDrawing = true;
      draw(e);
    }

    function endDrawing() {
      isDrawing = false;
      checkReveal();
    }

    // Load both images
    topImage.onload = () => {
      topCtx.drawImage(topImage, 0, 0, width, height);
    };
    bottomImage.onload = () => {
      bottomCtx.drawImage(bottomImage, 0, 0, width, height);
    };

    // Mouse events
    topCanvas.addEventListener('mousedown', startDrawing);
    topCanvas.addEventListener('mousemove', draw);
    topCanvas.addEventListener('mouseup', endDrawing);
    topCanvas.addEventListener('mouseleave', endDrawing);

    // Touch events
    topCanvas.addEventListener('touchstart', startDrawing, { passive: false });
    topCanvas.addEventListener('touchmove', draw, { passive: false });
    topCanvas.addEventListener('touchend', endDrawing);

  });
}



  