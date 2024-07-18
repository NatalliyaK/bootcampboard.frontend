import {API_URL} from '../api-url';
import {bootCampBoardAPI} from '../api';
import {EditTitleBlock} from '../../types/content';
import {toastsActions, ToastType} from '../../store/slices/toasts-slice';

export const editTitleBlock = bootCampBoardAPI.injectEndpoints({
  endpoints: (builder) => ({
    editTitleBlock: builder.mutation<EditTitleBlock, EditTitleBlock>({
      query: (blockData) => ({
        url: API_URL.editTitle,
        method: 'PATCH',
        body: blockData,
      }),

      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          await queryFulfilled;
        } catch (e: any) {
          const {status} = e.error;
          if (status !== 400) {
            dispatch(
              toastsActions.showToast({
                type: ToastType.Error,
                message: 'Something went wrong',
              }),
            );
          }
        }
      },

      invalidatesTags: ['dashboard'],
    }),
  }),
});
