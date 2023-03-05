const success = (data: any = {}, msg: string = '成功', code = 0) => {
  return { msg, data, code };
};
const err = (msg: string = '请求错误', data: any = {}, code = 1) => {
  return { msg, data, code };
};
export const result = {
  success,
  err,
};

export const url = (url: string) => {
  return process.env.URL + '/' + url;
};
