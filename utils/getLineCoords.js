const getLineCoords = (startX, startY, endX, endY) => {
  const coords = [];

  if (startX === endX) {
    // Vertical line
    const minY = Math.min(startY, endY);
    const maxY = Math.max(startY, endY);
    for (let y = minY; y <= maxY; y++) {
      coords.push(`${startX},${y}`);
    }
  } else if (startY === endY) {
    // Horizontal line
    const minX = Math.min(startX, endX);
    const maxX = Math.max(startX, endX);
    for (let x = minX; x <= maxX; x++) {
      coords.push(`${x},${startY}`);
    }
  } else {
    // Sloping line
    const slope = (endY - startY) / (endX - startX);
    const intercept = startY - slope * startX;
    const minX = Math.min(startX, endX);
    const maxX = Math.max(startX, endX);
    for (let x = minX; x <= maxX; x++) {
      const y = Math.round(slope * x + intercept);
      coords.push(`${x},${y}`);
    }
  }

  return coords;
};

export default getLineCoords;
