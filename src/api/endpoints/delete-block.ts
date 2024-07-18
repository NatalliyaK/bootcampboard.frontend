import {ToastType, toastsActions} from '../../store/slices/toasts-slice';
import {bootCampBoardAPI} from '../api';
import {API_URL} from '../api-url';

export const deleteBlock = bootCampBoardAPI.injectEndpoints({
  endpoints: (builder) => ({
    deleteBlock: builder.mutation<void, string>({
      query: (contentId) => ({
        url: API_URL.deleteBlock(contentId),
        method: 'DELETE',
        body: contentId,
      }),

      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          await queryFulfilled;
        } catch (e: any) {
          dispatch(
            toastsActions.showToast({
              type: ToastType.Error,
              message: 'Something went wrong',
            }),
          );
        }
      },

      invalidatesTags: ['dashboard'],
    }),
  }),
});
