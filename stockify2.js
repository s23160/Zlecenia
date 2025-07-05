document.addEventListener('DOMContentLoaded', function () {
    function Marquee(selector, speed) {
      const parent = document.querySelector(selector);
      const content = parent.children[0];

      const clone1 = content.cloneNode(true);
      const clone2 = content.cloneNode(true);
      parent.appendChild(clone1);
      parent.appendChild(clone2);

      let i = 0;
      let fullWidth = content.offsetWidth * 3;

      function animate() {
        i += speed;
        if (i >= fullWidth / 3) {
          i = 0;
        }
        parent.scrollLeft = i;
        requestAnimationFrame(animate);
      }

      animate();
    }
    Marquee('.marquee', 0.2);
  });
