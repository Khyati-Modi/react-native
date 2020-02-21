const dataReducer = (
  state = {
    recipeList: [],
  },
  action,
) => {

  switch (action.type) {
    case 'SET_RECIPE_LIST':
      return {recipeList: action.recipeList};

    default: {
      // eslint-disable-next-line no-labels
      recipeList: state.recipeList;
    }
  }
  return {recipeList: state.recipeList};
};
export default dataReducer;
