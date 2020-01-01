import Axios from "axios";

export default {
  state: {
    user: []
  },

  mutations: {
    setUser(state, payload) {
      state.user = payload;
    }
  },

  actions: {
    // 获取user
    getUser: function({ commit }, payload) {
      Axios.post("/find", {
        params: {
          name: payload.form.name,
          gender: payload.form.gender,
          createDate: payload.form.createDate
        }
      })
        .then(response => {
          commit("setUser", response.data);
        })
        .catch(error => {
          console.log(error);
        });
    },

    // 删除user
    deleteUser({ commit }, payload) {
      Axios.post("/delete", {
        params: {
          id: payload.id
        }
      }).then(response => {
        commit("setUser", response.data);
      });
    },

    // 保存或更新user
    saveOrUpdateUser({ commit }, payload) {
      Axios.post("/saveOrUpdate", payload.form)
        .then(response => {
        commit("setUser", response.data);
      });
    }
  }
};
