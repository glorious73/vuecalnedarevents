import Vue from 'vue';
import Vuex from 'vuex';
import { seedData } from '../seed.js';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    seedData: seedData
  },
  getters: {
    getActiveDay: (state) => {
        return state.seedData.find((day) => day.active);
    }
  },
  mutations: {
    SET_ACTIVE_DAY (state, dayId) {
        state.seedData.map((dayObj) => { 
          (dayObj.id === dayId) ? dayObj.active = true : dayObj.active = false; 
        });
    }
  },
  actions: {
    setActiveDay(context, dayId) {
      context.commit('SET_ACTIVE_DAY', dayId);
    }
  },
  modules: {
  }
});

export default store;