<template>
    <header class="title-header">
        <h1>Cards Car Specs</h1>
    </header>
    <section>
        <div class="cards-container">
            <CardCars 
                v-for="car in cars" 
                :key="car.id" 
                :cars="car" 
            />
        </div>
    </section>
</template>

<script>
import CardCars from '../components/CardCars.vue';

 export default {
    components: {CardCars},

     data() {
        return {
            cars: [],
            selectedId: null,
            error: null,
        }
    },

    mounted() {
        fetch('/json-cars.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                this.cars = data;
            })
            .catch(error => {
                this.error = 'There was a problem fetching the car data: ' + error.message;
            });
        }
 }   
</script>
 
<style scoped>
.title-header {
    background-color: whitesmoke;
    border-top: 5px solid black;
    border-bottom: 10px solid black;
    text-align: center;
    margin: 20px 0;
    font-size: 32px;
    font-weight: bold;
}

.cards-container {

    display: grid;
    grid-template-columns: repeat(3, minmax(300px, 1fr));
    gap: 20px;
    padding: 20px;
    justify-items: center;
}
</style>