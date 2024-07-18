import {bootCampBoardAPI} from '../api';
import {API_URL} from '../api-url';
import {toastsActions, ToastType} from '../../store/slices/toasts-slice';
import {AddContentBlock} from '../../types/content';

export const addContentBlock = bootCampBoardAPI.injectEndpoints({
  endpoints: (builder) => ({
    addBlock: builder.mutation<void, AddContentBlock>({
      query: (newContentBlock) => ({
        url: API_URL.content,
        method: 'POST',
        body: newContentBlock,
      }),
      transformErrorResponse: (response, meta, arg) => response.data,
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
