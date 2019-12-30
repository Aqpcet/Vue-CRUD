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
      Axios.get("http://localhost:8080/find", {
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
    deleteUser({ dispatch }, payload) {
      Axios.delete("http://localhost:8080/delete", {
        params: {
          id: payload.id
        }
      }).then(response => {
        console.log(response);
        dispatch("getUser", { form: "" });
      });
    },

    // 保存或更新user
    saveOrUpdateUser({ dispatch }, payload) {
      Axios.post("http://localhost:8080/saveOrUpdate", payload.form).then(
        response => {
          console.log(response);
          dispatch("getUser", { form: "" });
        }
      );
    }
  }
};
