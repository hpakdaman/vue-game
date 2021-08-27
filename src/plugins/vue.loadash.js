import _ from "lodash";

export default {
  install: (app) => {
    app.config.globalProperties.$_ = _;
  },
};
