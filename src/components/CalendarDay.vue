<template>
    <div class="day column" v-on:click="setActiveDay(day.id)">
        <div class="day-banner has-text-white has-text-centered">{{ day.abbvTitle }}</div>
        <div class="day-details">
            <div class="day-number">{{ day.id }}</div>
            <CalendarEvent v-for="event in day.events" v-bind:key="day.events.indexOf(event)" v-bind:event="event" v-bind:day="day" />
        </div>
    </div>
</template>

<script>
    import CalendarEvent from './CalendarEvent.vue';

    export default {
        name: 'CalendarDay',
        props: ['day'],
        methods: {
            setActiveDay(dayId) {
                this.$store.dispatch('setActiveDay', dayId);
            }
        },
        components: {
            CalendarEvent: CalendarEvent
        }
    }
</script>

<style lang="scss" scoped>
.day {
  background-color: #4A4A4A;
  color: #FFF;
  border-left: 1px solid #8F8F8F;
  border-bottom: 1px solid #8F8F8F;
  font-size: 12px;
  cursor: pointer;

  &:hover {
    background: darken(#4A4A4A,3%);
  }

  .day-banner {
    background-color: #333333;
    color: #FFF;
    padding: 10px;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 12px;
    font-weight: 600;
  }

  .day-details {  
    padding: 10px;
    margin: auto;
  }

  .day-event {
      color: #222;
      text-align: center;
      padding: 5px;
      margin-top: 5px;
      margin-bottom: 5px;
  }

  &:last-child {
    border-right: 1px solid #8F8F8F;
  }
}
</style>