export default (Vue, {loading, error}) => {
  Vue.directive('img-fallback', {
    inserted: (el) => {},
    bind: (el, binding, vnode) => {
      const {
        name, value, oldValue, expression, arg, modifiers
      } = binding;

      const defaultLoading = loading || 'http://de.4-traders.com/images/loading_100.gif';
      const defaultError = error || 'https://pbs.twimg.com/media/BXhh-sfIAAArh4S.jpg';
      let loading = defaultLoading;
      let err = defaultError;
      let original = el.src;

      let img = new Image();

      if(typeof value === 'string') {
        loading = value;
        err = value;
      }

      if(value instanceof Object) {
        loading = value.loading || defaultLoading;
        err = value.error || defaultError;
      }
      
      img.src = original;

      el.src = loading;
      
      img.onload = () => {
        el.src = original;
      };

      img.onerror = () => {
        el.src = err;
      };
    }
  });
};