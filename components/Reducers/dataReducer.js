const dataReducer = (
  state = {
    recipeList: [],
  },
  action,
) => {
  console.log('Called dataReducer');

  switch (action.type) {
    case 'SET_RECIPE_LIST':
      console.log('Called dataReducer SET_RECIPE_LIST');
      console.log(action.recipeList);
      //state.token
      return {recipeList: action.recipeList};

    default: {
      // eslint-disable-next-line no-labels
      recipeList: state.recipeList;
    }
  }
  return {recipeList: state.recipeList};
};
export default dataReducer;
