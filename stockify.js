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

document.addEventListener('DOMContentLoaded', function () {
    const questions = document.querySelectorAll('.faq-question');

    questions.forEach(button => {
      button.addEventListener('click', () => {
        const answer = button.nextElementSibling;
        const isOpen = answer.style.display === 'block';

        // Zamknij wszystkie
        document.querySelectorAll('.faq-answer').forEach(a => {
          a.style.display = 'none';
        });

        // Otwórz jeśli nie był otwarty
        if (!isOpen) {
          answer.style.display = 'block';
        }
      });
    });
  });      

document.addEventListener('DOMContentLoaded', function() {
    if (window.innerWidth > 767) {
        // Przechodzimy przez wszystkie produkty
        document.querySelectorAll('.products.s-row .product, #box_lastadded .product, #box_specialoffer .product, #box_bestsellers .product, box_productoftheday .product, #box_recommendations_42 .product').forEach(function(productElement) {
            
            // Sprawdzamy, czy swap już zainicjowany, jeśli tak - pomijamy
            if (productElement.dataset.swapInitialized) return;

            var productId = productElement.getAttribute('data-product-id');
            
            // Wywołujemy API do pobrania danych produktu
            frontAPI.getProduct(function(product) {
                if (product.images && product.images_filename && product.images_filename[1]) {
                    var imageFileName = product.images_filename[1]; 

                    // Tworzymy pełny URL z nazwą pliku
                    var imageUrl = '/environment/cache/images/500_500_productGfx_' + imageFileName;

                    // Zapisujemy drugie zdjęcie w atrybucie data-2-image
                    var imageElement = productElement.querySelector('img');
                    if (imageElement) {
                        imageElement.setAttribute('data-2-image', imageUrl);
                    }
                }
            }, { id: productId });


            // Nasłuchujemy na zdarzenie 'mouseover' dla obrazka
            productElement.addEventListener('mouseover', function() {
                var imageElement = productElement.querySelector('img');
                var newImage = imageElement ? imageElement.getAttribute('data-2-image') : null;
                if (newImage) {
                    imageElement.setAttribute('src', newImage);
                }
            });

            // Nasłuchujemy na zdarzenie 'mouseleave' dla obrazka
            productElement.addEventListener('mouseleave', function() {
                var imageElement = productElement.querySelector('img');
                var originalImage = imageElement ? imageElement.getAttribute('data-src') : null;
                if (originalImage) {
                    imageElement.setAttribute('src', originalImage);
                }
            });

            // Oznaczamy, że swap jest zainicjowany
            productElement.dataset.swapInitialized = 'true';
        });
    }
});
