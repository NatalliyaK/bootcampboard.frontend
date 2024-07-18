import {API_URL} from '../api-url';
import {bootCampBoardAPI} from '../api';
import {ContentData} from '../../types/content';
import {toastsActions, ToastType} from '../../store/slices/toasts-slice';

export const contentData = bootCampBoardAPI.injectEndpoints({
  endpoints: (builder) => ({
    getContentData: builder.query<ContentData[], void>({
      query: () => ({
        url: API_URL.content,
        method: 'GET',
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
      providesTags: (result) => ['dashboard'],
    }),
  }),
});
