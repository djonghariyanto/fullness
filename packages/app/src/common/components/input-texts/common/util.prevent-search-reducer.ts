const preventSearchReducer = (key: string) => {
  switch(key) {
    case 'Escape':
      return false;
  }
}

export default preventSearchReducer;
