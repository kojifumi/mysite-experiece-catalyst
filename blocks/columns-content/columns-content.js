export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-content-${cols.length}-cols`);

  // setup image columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper) {
          // Check if there's a heading or strong text after the image (for image overlay)
          const heading = col.querySelector('h2, h3, h4, strong');
          const hasTextAfterImage = picWrapper.textContent.trim() ||
                                    picWrapper.querySelector('strong, h2, h3, h4');

          if (heading && picWrapper.querySelector('strong, h2, h3, h4')) {
            picWrapper.classList.add('columns-content-img-col', 'has-overlay');
            // Create overlay with the heading/strong text
            const overlay = document.createElement('div');
            overlay.classList.add('columns-content-overlay');
            const textNode = picWrapper.querySelector('strong, h2, h3, h4');
            if (textNode) {
              overlay.appendChild(textNode.cloneNode(true));
              textNode.remove();
            }
            picWrapper.appendChild(overlay);
          } else if (picWrapper.children.length === 1) {
            // picture is only content in column
            picWrapper.classList.add('columns-content-img-col');
          }
        }
      }
    });
  });
}
