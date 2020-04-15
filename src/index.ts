declare module 'highest-z-index-of-document';

function findHighestZIndex(): number {
  const elems = document.getElementsByTagName("*");
  let highest = 0;
  for (let i = 0; i < elems.length; i++) {
    const zindex = parseInt(document.defaultView.getComputedStyle(elems[i], null).getPropertyValue("z-index"));
    if ((zindex > highest)) {
      highest = zindex;
    }
  }
  return highest;
}

export default findHighestZIndex;
