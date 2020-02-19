export function setRecipeList(recipeList) {
  console.log('called DataActions ===  ');
  console.log(recipeList);
  return {
    type: 'SET_RECIPE_LIST',
    recipeList: recipeList,
  };
}
