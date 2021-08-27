export default (sound) => {
  try {
    window.audio.src = sound;
    requestAnimationFrame(async function() {
      window.audio.currentTime = 0;
      window.audio.play();
      // setTimeout(async () => await window.audio.pause(), duration);
    });
  } catch (e) {
    e;
  }
};
