import {TableFilter} from '../types/table';

export const API_URL = {
  baseURL: process.env.REACT_APP_BASE_URL,
  login: '/token',
  refreshToken: '/token/refresh',
  revokeToken: '/token/revoke',
  user: '/user',
  userProfile: '/user/profile',
  deleteUser: (id: string) => `/user/${id}`,
  updateUserPassword: '/user/credential',
  content: '/content',
  deleteBlock: (id: string) => `/content/${id}`,
  tableData: (id: string) => `/table/?id=${id}`,
  editTitle: '/content/title',
  tableFilteredData: ({id, columnId, filterValue}: TableFilter) =>
    `/table/filter?id=${id}&columnId=${columnId}&filterValue=${filterValue}`,
  editTableColumn: '/table/column',
  editTableRow: '/table/row',
  editTableCell: '/table/cell',
  getContentBlock: (id: string) => `/content/${id}`,
  updateContentBlockText: '/content/text',
};
