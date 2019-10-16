function text_width(text, size, max_width) {
  const width = Math.min(max_width, text.length);
  return width*size*0.60009765625;
}

export default text_width;
