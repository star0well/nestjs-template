const success = (data: any = {}, message: string = '成功', code = 0) => {
  return { message, data, code };
};
const err = (message: string = '请求错误', data: any = {}, code = 1) => {
  return { message, data, code };
};
export const result = {
  success,
  err,
};
export const paginate = (data: { page: number; total: number; row: number; data: any[] }) => {
  return {
    meta: {
      current_page: data.page,
      row: data.row,
      total: data.total,
      page_row: Math.ceil(data.total / data.row),
    },
    data: data.data,
  };
};

export const url = (url: string) => {
  return process.env.URL + '/' + url;
};
