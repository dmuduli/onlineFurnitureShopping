<template>
  <div class="flex flex-col md:flex-row">
    <div
      v-scrollanimation
      class="prose prose-store max-w-none md:w-1/2 w-full mb-8 animated animatedFadeInUp fadeInUp duration-1000"
    >
      <cms-rich-text :field="openHour" />
      <h6 class="current-date">{{ currentDate }}</h6>
      <ul>
        <li
          v-for="(item, index) in primary.opening_hours.weekday_text"
          :key="index"
        >
          {{ item }}
        </li>
      </ul>
    </div>
    <div
      class="inline-flex md:w-1/2 w-full mb-8 relative animated animatedFadeInUp fadeInUp duration-1000"
    >
      <div class="text-content absolute top-8 lg:top-28 max-w-1/2">
        <p class="text-2xl font-medium text-gray-900 mb-2">
          {{ primary.franchisee_name }}
        </p>
        <p class="text-sm uppercase text-gray-900">
          {{ primary.franchisee_position }}
        </p>
      </div>
      <div>
        <img
          v-scrollanimation
          :src="primary.franchisee_image"
          :alt="primary.franchisee_name"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    primary: { type: Object, default: () => {}, required: true },
    openHour: { type: Array, default: () => [], required: true },
  },
  computed: {
    currentDate() {
      const today = new Date();
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const dd = String(today.getDate()).padStart(2, "0");
      let day = days[today.getDay()];
      let month = months[today.getMonth()];
      return `${day} ${dd} ${month}`;
    },
  },
};
</script>
