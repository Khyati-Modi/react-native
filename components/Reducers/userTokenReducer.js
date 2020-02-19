const userTokenReducer = (
  state = {
    token: '',
  },
  action,
) => {
  switch (action.type) {
    case 'TOKEN':
      //state.token
      return {token: action.value};

    default: {
      // eslint-disable-next-line no-labels
      token: state.token;
    }
  }
  return {token: state.token};
};

export default userTokenReducer;
