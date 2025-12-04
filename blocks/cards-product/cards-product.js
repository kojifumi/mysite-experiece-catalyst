import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) {
        div.className = 'cards-product-card-image';
      } else {
        div.className = 'cards-product-card-body';

        // Parse the paragraph content and structure it
        const p = div.querySelector('p');
        if (p) {
          const content = p.innerHTML;
          const parts = content.split('<br>').map(part => part.trim()).filter(part => part);

          if (parts.length >= 4) {
            // Clear the paragraph
            p.innerHTML = '';

            // Create structured content
            const meta = document.createElement('div');
            meta.className = 'cards-product-meta';

            const badge = document.createElement('span');
            badge.className = 'cards-product-badge';
            badge.textContent = parts[0];

            const readTime = document.createElement('span');
            readTime.className = 'cards-product-read-time';
            readTime.textContent = parts[1];

            meta.appendChild(badge);
            meta.appendChild(readTime);

            // Extract heading (remove ### prefix)
            const headingText = parts[2].replace(/^###\s*/, '');
            const heading = document.createElement('h3');
            heading.textContent = headingText;

            // Description
            const description = document.createElement('p');
            description.className = 'cards-product-description';
            description.textContent = parts[3];

            // Read link
            const readLink = div.querySelector('a');
            if (readLink) {
              readLink.className = 'cards-product-read-link';
            }

            // Append all elements
            div.insertBefore(meta, p);
            div.insertBefore(heading, p);
            div.insertBefore(description, p);
            p.remove();
          }
        }
      }
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    img.closest('picture').replaceWith(optimizedPic);
  });
  block.textContent = '';
  block.append(ul);
}
