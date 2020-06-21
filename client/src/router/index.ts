import { IRoute } from './Route/index.tsx';

export const instances:IRoute[] = []; // active routes array

export const register = (comp: IRoute) => instances.push(comp);
export const unregister = (comp: IRoute) => instances.splice(instances.indexOf(comp), 1);

export const historyPush = (path: string) => {
  history.pushState({}, path, path);
  instances.forEach((instance) => instance.forceUpdate());
};

export const historyReplace = (path: string) => {
  history.replaceState({}, path, path);
  instances.forEach((instance) => instance.forceUpdate());
};

interface MatchPath {
  path: string | null,
  url: string,
  isExact: boolean,
}

interface Options {
  exact: boolean,
  path: string,
}

export const matchPath = (pathname: string, options: Options):MatchPath | null => {
  const { exact = false, path } = options;

  if (!path) {
    return {
      path: null,
      url: pathname,
      isExact: true,
    };
  }

  const exp = `^${path}`;
  const match = new RegExp(exp).exec(pathname);

  if (!match) return null;

  const url = match[0];
  const isExact = pathname === url;

  if (exact && !isExact) return null;

  return {
    path,
    url,
    isExact,
  };
};
