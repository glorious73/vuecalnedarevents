<template>
  <div class="day-event" :style="getEventBackgroundColor">
    <div>
      <div v-if="!event.edit">
        <span class="has-text-centered details">{{ event.details }}</span>
        <div class="has-text-centered icons">
          <i class="fa fa-pencil-square edit-icon" v-on:click="editEvent(day.id, event.details)"></i>
          <i class="fa fa-trash-o delete-icon" v-on:click="deleteEvent(day.id, event.details)"></i>
        </div>
      </div>
      <div v-if="event.edit">
        <input type="text" :placeholder="event.details" v-model="newEventDetails" />
        <div class="has-text-centered icons">
          <i class="fa fa-check" v-on:click="updateEvent(day.id, event.details, newEventDetails)"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CalendarEvent",
  props: ["event", "day"],
  data () {
    return {
      newEventDetails: ''
    }
  },
  computed: {
    getEventBackgroundColor() {
      const colors = ["#FF9999", "#85D6FF", "#99FF99"];
      let randomColor = colors[Math.floor(Math.random() * colors.length)];
      return `background-color: ${randomColor}`;
    },
  },
  methods: {
      editEvent(dayId, eventDetails) {
          this.$store.dispatch('setEditEvent', { dayId, eventDetails });
      },
      updateEvent (dayId, originalEventDetails, updatedEventDetails) {
        if (updatedEventDetails === '') 
            updatedEventDetails = originalEventDetails;
        this.$store.dispatch('updateEvent', { dayId, originalEventDetails, updatedEventDetails });
        this.newEventDetails = '';
      },
      deleteEvent(dayId, eventDetails) {
          this.$store.dispatch('deleteEvent', { dayId, eventDetails});
      }
  }
};
</script>

<style lang="scss" scoped>
.day-event {
  margin-top: 6px;
  margin-bottom: 6px;
  display: block;
  color: #4c4c4c;
  padding: 5px;

  .details {
    display: block;
  }

  .icons .fa {
    padding: 0 2px;
  }

  input {
    background: none;
    border: 0;
    border-bottom: 1px solid #fff;
    width: 100%;

    &:focus {
      outline: none;
    }
  }
}
</style>