import {API_URL} from '../api-url';
import {bootCampBoardAPI} from '../api';
import {UpdateUser} from '../../types/users';
import {toastsActions, ToastType} from '../../store/slices/toasts-slice';
import {currentUserSliceActions} from '../../store/slices/current-user-slice';

export const updateUserProfile = bootCampBoardAPI.injectEndpoints({
  // UPDATE USER PROFILE DATA
  endpoints: (builder) => ({
    updateUserProfile: builder.mutation<UpdateUser, UpdateUser>({
      query: (updateUserData) => ({
        url: API_URL.userProfile,
        method: 'PATCH',
        body: updateUserData,
      }),

      async onQueryStarted(updateUserData, {dispatch}) {
        try {
          dispatch(currentUserSliceActions.updateCurrentUser(updateUserData));
        } catch (e) {
          dispatch(
            toastsActions.showToast({
              type: ToastType.Error,
              message: 'Something went wrong',
            }),
          );
        }
      },

      invalidatesTags: ['users'],
    }),
  }),
});
