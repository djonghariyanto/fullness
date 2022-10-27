const preventDefaultReducer = (key: string) => {
  switch(key) {
    case 'ArrowUp':
      return true;
    case 'ArrowDown':
      return true;
    case 'Escape':
      return true;
  }
}

export default preventDefaultReducer;
