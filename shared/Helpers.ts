import { Link, DomainList } from "./types";

export const getTypeQuery = (type: number) => {
  return type === 0 ? "(1,2)" : `(${type})`;
};

export const getPagination = (pageParam: number, PAGE_LIMIT: number) => {
  const to = pageParam * PAGE_LIMIT - 1;
  const from = (pageParam - 1) * PAGE_LIMIT;
  return { from, to };
};

export const getParsedUrls = (links: Link[] | undefined) => {
  let result: DomainList[] = [];

  let domains = links?.map((link) => {
    let urlArr = link.url.split("//")[1].split(".");
    return urlArr.length === 3 ? urlArr[1] : urlArr[0];
  });

  //@ts-ignore
  let domainsSet: string[] = [...new Set(domains)];
  domainsSet.forEach((d) => result.push({ domain: d, urls: [] }));

  links?.forEach((link) => {
    let urlArr = link.url.split("//")[1].split(".");
    let domain = urlArr.length === 3 ? urlArr[1] : urlArr[0];

    result = result.map((r) => {
      if (r.domain === domain) {
        return { ...r, urls: [...r.urls, link] };
      }
      return r;
    });
  });

  return result;
};

export const getFaviconUrl = (url: string) => {
  const url_split = url.split("/");
  return `${url_split[0]}//${url_split[2]}/favicon.ico`;
};
