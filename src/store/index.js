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
    },
    getEventObject: (state) => ({ dayId, eventDetails }) => {
      const dayObject = state.seedData.find(day => day.id === dayId);
      return dayObject.events.find(event => event.details === eventDetails);
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
    },
    UPDATE_EVENT(state, { eventObject, updatedEventDetails }) {
        eventObject.details = updatedEventDetails;
        eventObject.edit = false;
    },
    DELETE_EVENT(state, { dayId, eventDetails }) {
      const dayObject = state.seedData.find(day => day.id === dayId);
      const eventIndexToRemove = dayObject.events.findIndex(event => event.details === eventDetails);
      dayObject.events.splice(eventIndexToRemove, 1);
    },
    RESET_EDIT_OF_ALL_EVENTS(state) {
      state.seedData.map((dayObj) => {
        dayObj.events.map((event) => {
          event.edit = false;
        });
      });
    }
  },
  actions: {
    setActiveDay(context, dayId) {
      context.commit('SET_ACTIVE_DAY', dayId);
    },
    submitEvent(context, eventDetails) {
      const activeDay = this.getters.getActiveDay;
      context.commit('SUBMIT_EVENT', { activeDay, eventDetails});
    },
    setEditEvent(context, { dayId, eventDetails }) {
      context.commit('RESET_EDIT_OF_ALL_EVENTS');
      const eventObject = context.getters.getEventObject({ dayId, eventDetails });
      eventObject.edit = true;
    },
    updateEvent(context, { dayId, originalEventDetails, updatedEventDetails }) {
      const eventObject = context.getters.getEventObject({ dayId, eventDetails: originalEventDetails });
      context.commit('UPDATE_EVENT', { eventObject, updatedEventDetails});
    },
    deleteEvent(context, { dayId, eventDetails }) {
      context.commit('DELETE_EVENT', { dayId, eventDetails });
    }
  },
  modules: {
  }
});

export default store;