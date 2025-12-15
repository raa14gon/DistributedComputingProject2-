<template>
    <div class="card-container">
        <div class="card-image"><img :src="getImage(cars.image)" :alt="cars.alt"></div>
        <div class="card-info">
            <h3>{{ cars.title }}</h3>
            <ul class="card-info-list">
                <li>{{ cars.market }}</li>
                <li>Engine: {{ cars.engine }}</li>
                <li>Power(HP): {{ cars.power }}</li>
                <li>Torque(kgfm): {{ cars.torque }}</li>
                <li>Transmission: {{ cars.transmission }}</li>
                <li>Drive Train: {{ cars.drivetrain }}</li>
                <li>0-100: {{ cars.zerotohundred }}</li>
                <li>Top Speed: {{ cars.topspeed }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        cars: {
            type: Object,
            required: true
        }
    },
    methods: {
        getImage(img) {
            return new URL(`../assets/img-json/${img}`, import.meta.url).href
        }
    }
}
</script>

<style>
.card-container {
    border: 2px solid gray;
    background-color: whitesmoke;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border-radius: 10px;
    padding: 15px;
    margin-bottom: 40px;
    list-style: none;
    height: 620px;
    max-width: 400px;
    min-width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
}

.card-container:hover {
    transform: scale(1.03);
    transition: transform 0.3s;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
}

.card-image {
    border-radius: 10px;
    border: 2px solid gray;
    width: 100%;
    min-height: 250px;
    max-height: 250px;
}

.card-image img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
}

.card-info-list {
    background-color: rgb(225, 225, 225);
    padding: 10px;
    min-width: 350px;
    min-height: 270px;
    max-height: 270px;
    margin-top: 20px;
    border: 1px solid gray;
    border-radius: 10px;
    list-style: none;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    gap: 8px;
}
</style>