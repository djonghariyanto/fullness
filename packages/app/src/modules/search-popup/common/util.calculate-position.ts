const calculatePosition = ([menu, anchor]) => {
  const left = anchor.left,
    top = anchor.top + anchor.height-1,
    width = anchor.width;

  return { top, left, width }
}

export default calculatePosition;
