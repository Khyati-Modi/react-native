const userProfileImageReducer = (
  state = {
    profilePhoto:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRi-I5E9Vn6dFsuJnrJfJVcpNp6KNQ74ZSjKoGn5t9-pGLddxDG',
  },
  action,
) => {
  switch (action.type) {
    case 'SET_PRO_PIC':
      return {profilePhoto: action.profilePhoto};
    default: {
      // eslint-disable-next-line no-labels
      profilePhoto: state.profilePhoto;
    }
  }
  return {profilePhoto: state.profilePhoto};
};
export default userProfileImageReducer;
