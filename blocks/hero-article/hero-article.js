export default function decorate(block) {
  const picture = block.querySelector('picture');

  if (!picture) {
    block.classList.add('no-image');
    return;
  }

  // Move picture element to be a direct child of block for background effect
  block.append(picture);
}
