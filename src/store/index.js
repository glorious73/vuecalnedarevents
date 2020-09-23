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
    },
    SUBMIT_EVENT(state, DayAndEventDetails) {
       DayAndEventDetails.activeDay.events.push({ "details": DayAndEventDetails.eventDetails, "edit": false });
    }
  },
  actions: {
    setActiveDay(context, dayId) {
      context.commit('SET_ACTIVE_DAY', dayId);
    },
    submitEvent(context, eventDetails) {
      const activeDay = this.getters.getActiveDay;
      context.commit('SUBMIT_EVENT', { activeDay, eventDetails});
    }
  },
  modules: {
  }
});

export default store;