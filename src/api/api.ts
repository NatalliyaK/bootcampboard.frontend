import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQueryWithReAuth} from './base-query/base-query-with-reauth';

export const bootCampBoardAPI = createApi({
  reducerPath: 'bootCampBoardAPI',
  baseQuery: baseQueryWithReAuth,
  refetchOnMountOrArgChange: true,
  tagTypes: ['users', 'profile', 'dashboard', 'tableData', 'tableFilteredData'],
  endpoints: () => ({}),
});
