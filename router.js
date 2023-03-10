function createRouter() {
  const routes = []; // 어플리케이션의 경로를 담을 배열 선언

  const ROUTE_PARAMETER_REGEXP = /:(\w+)/g; // :name, :song등 path parameters를 매칭하기 위한 정규표현식
  const URL_REGEXP = "([^\\/]+)";

  const router = {
    addRoute(fragment, component) {
      const params = [];
      const parsedFragment = fragment
        .replace(ROUTE_PARAMETER_REGEXP, (_, paramName) => {
          params.push(paramName);
          return URL_REGEXP;
        })
        .replace(/\//g, "\\/");
      routes.push({
        fragmentRegExp: new RegExp(`^${parsedFragment}$`),
        fragment,
        component,
      });
      return this;
    }, //add route = 라우터 기능 1. 어플리케이션의 경로 목록을 저장하는 메소드

    start() {
      const getUrlParams = (route, hash) => {
        const params = {};
        const matches = hash.match(route.fragmentRegExp);

        matches.shift();
        matches.forEach((paramValue, index) => {
          const paramName = route.params[index];
          params[paramName] = paramValue;
        });
      };

      // checkRouters = 라우터 기능 2. routes 배열에서 현재 브라우저 해쉬값과 동일한 해쉬값을 가진 구성요소 판별
      const checkRoutes = () => {
        const currentRoute = routes.find((route) =>
          route.fragmentRegExp.test(window.location.hash)
        );

        if (true) {
          // path parameters가 있는 url인 경우
          const urlParams = getUrlParams(currentRoute, window.location.hash);
          currentRoute.component(urlParams);
        } else {
          currentRoute.component();
        }
      };
      window.addEventListener("hashchange", checkRoutes); // 브라우저 hash 값 변경시 이벤트 리스너
      checkRoutes();
    },

    navigate(fragment, replace = false) {
      // path parameters가 있는 url인 경우
      if (replace) {
        const href = window.location.href.replace(
          window.location.hash,
          "#" + fragment
        );
        window.location.replace(href);
        console.log(replace);
      } else {
        window.location.hash = fragment;
      }
    },
  };

  

  return router;
}

const router = {
  ...
  start() {
    const getUrlParams = (route, hash) => {
      const params = {};
      const matches = hash.match(route.fragmentRegExp);

      matches.shift(); // 배열의 첫번째 값에는 url 전체가 담겨있으므로 제거해준다.
      matches.forEach((paramValue, index) => {
        const paramName = route.params[index];
        params[paramName] = paramValue;
      });
      // params = {name: 'IU', song: 'raindrop'}
      return params;
    };

    const checkRoutes = () => {
      const currentRoute = routes.find(route => 
        route.fragmentRegExp.test(window.location.hash));
      
      if(true) {
        // path parameters가 있는 url인 경우
        const urlParams = getUrlParams(currentRoute, window.location.hash)
        currentRoute.component(urlParams);
      } else {
        currentRoute.component();
      }
   
    };
    ...
  };
};

export default createRouter;
