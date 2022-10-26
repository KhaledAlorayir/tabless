export const getTypeQuery = (type: number) => {
  return type === 0 ? "(1,2)" : `(${type})`;
};

export const getPagination = (pageParam: number, PAGE_LIMIT: number) => {
  const to = pageParam * PAGE_LIMIT - 1;
  const from = (pageParam - 1) * PAGE_LIMIT;
  return { from, to };
};
