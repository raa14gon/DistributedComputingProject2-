<template>
  <div v-if="race" class="details">
    <h3>{{ race.raceName }}</h3>
    <p>CIRCUIT: {{ race.Circuit?.circuitName || 'N/A' }}</p>
    <p>DATE: {{ race.date || 'N/A' }}</p>

    <div v-if="history" class="history">
      <h4>HISTORY</h4>
      <p v-if="history.extract" class="extract">
        {{ history.extract }}
      </p>
      <p v-else class="no-data">
        NO DATA AVAILABLE
      </p>
    </div>
    <p v-else class="loading">
      LOADING HISTORY...
    </p>
  </div>
  <div v-else class="details no-race">
    <p>SELECT A RACE TO VIEW DETAILS</p>
  </div>
</template>

<script>
export default {
  name: 'VintageRaceDetails',
  props: {
    race: {
      type: Object,
      default: null
    },
    history: {
      type: Object,
      default: null
    }
  }
}
</script>

<style scoped>
.details {
  margin-top: 20px;
  border: 2px solid #00ff66;
  padding: 16px;
  min-height: 200px;
}

.details.no-race {
  display: flex;
  align-items: center;
  justify-content: center;
}

.history {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px dashed #00ff66;
}

.history h4 {
  margin: 0 0 10px 0;
  font-size: 14px;
}

.extract {
  margin: 0;
  font-size: 12px;
  line-height: 1.4;
}

.no-data,
.loading {
  color: #ffaa00;
  font-size: 12px;
  margin: 0;
}
</style>