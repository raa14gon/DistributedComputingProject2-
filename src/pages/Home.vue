<template>
    <header>
        <div class="info-header">
            <p>The 1970s marked the golden era of automotive history, a time when cars arrived with
                bold designs, aggressive lines, and massive engines that defined pure personality.
                Long hoods, chrome grilles, and roaring V8s ruled the streets, while American muscle
                cars and iconic European sports machines shaped a decade of freedom, power, and
                unmistakable style — an unforgettable era when every car was built to impress.</p>
        </div>
    </header>

    <section class="scene">
        <div class="magazine">


            <div class="container-magazine">
                <img src="../assets/quatro-rodas.png" @click="openCard(1)" alt="Magazine Quatro Rodas">
                <img src="../assets/auto-esporte.png" @click="openCard(2)" alt="Magazine Auto Esporte">
                <img src="../assets/car-and-driver.png" @click="openCard(3)" alt="Magazine Car and Driver">
            </div>

            <div v-if="selectedMagazine" class="overlay" @click.self="selectedId = null">
                <CardMagazine :magazine="selectedMagazine" @close="selectedId = null" />
            </div>
        </div>
        <div>
            <img src="../assets/car.png" class="car" :class="animationPhase" />

            <h2 v-if="showText" class="cta" :class="textPhase">
                ! Click on Magazines !
            </h2>

            <div class="road"></div>
        </div>

    </section>



    <section class="section-follow-us">
        <div class="container-follow-us">
            <div class="follow-us">
                <h1>Follow Us</h1>
                <ul>
                    <li>Instragram: @70sCarCulture</li>
                    <li>Twitter/X: @70sCarCulture</li>
                    <li>Facebook: @70sCarCulture</li>
                    <li>Youtube: @70sCarCulture</li>
                </ul>
            </div>
            <div class="image-follow-us">
                <img src="../assets/follow-us.png" alt="racing car">
            </div>
        </div>
    </section>
</template>

<script>
import CardMagazine from '../components/CardMagazine.vue';

export default {
    components: { CardMagazine },

    data() {
        return {
            magazines: [],
            selectedId: null,
            error: null,

            animationPhase: "go",
            showText: false,
            textPhase: ""
        }
    },

    computed: {
        selectedMagazine() {
            return this.magazines.find(m => m.id === this.selectedId)
        }
    },

    mounted() {
        fetch('/70sCarCulture-s/json-magazines.json')
            .then(res => res.json())
            .then(data => this.magazines = data)
            .catch(err => this.error = err.message)

        this.startCarAnimation()
    },

    methods: {
        openCard(id) {
            this.selectedId = id
            this.animationPhase = ""
            this.showText = false
        },

        startCarAnimation() {
            this.animationPhase = ""
            this.showText = false
            this.textPhase = ""


            void document.querySelector('.car')?.offsetWidth

            this.animationPhase = "go"

            setTimeout(() => {
                this.showText = true
                this.textPhase = "typing"
            }, 1500)

            setTimeout(() => {
                this.animationPhase = "back"
                this.textPhase = "erasing"
            }, 3000)

            setTimeout(() => {
                this.showText = false
            }, 6000)

            setTimeout(() => {
                this.startCarAnimation()
            }, 10000)
        }
    }
}
</script>

<style scoped>
header {
    box-shadow: rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;

    display: flex;
    align-items: center;
    height: 450px;
    background-image: url('../assets/bg-header.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    padding: 0 20px;
}

.info-header {
    margin-left: 30px;
    background-color: whitesmoke;
    margin-bottom: 50px;
    padding: 20px;
    width: 600px;
    height: 150px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
}

.info-header p {
    margin: 0;
}

.scene {
    box-shadow: rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;

    position: relative;
    height: 600px;
    margin-top: 100px;
    overflow: hidden;
    background-image: url('../assets/bg-scene.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
}

.car {
    position: absolute;
    bottom: -62px;
    width: 220px;
    left: -250px;
    opacity: 0;
}

.car.go {
    animation: drive 3s linear forwards, fadeIn 3s linear forwards;
}

.car.back {
    animation: driveBack 4s linear forwards, fadeInBack 4s linear forwards;
}

@keyframes drive {
    from {
        transform: translateX(100vw);
    }

    to {
        transform: translateX(-250px);
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes fadeInBack {
    from {
        opacity: 1;
    }

    to {
        opacity: 1;
    }
}

@keyframes driveBack {
    from {
        transform: translateX(-250px) scaleX(-1);
    }

    to {
        transform: translateX(120vw) scaleX(-1);
    }
}

.road {
    background-color: #111;
    width: 100%;
    height: 20px;
    border-bottom: 8px solid #555;
    position: absolute;
    bottom: 0;
}

.cta {
    position: absolute;
    bottom: 50px;
    right: 50%;
    transform: translateX(50%);
    font-size: 32px;
    font-weight: bold;
    letter-spacing: 1px;
    white-space: nowrap;
    text-align: center;
    opacity: 0;
    transition: opacity 0.8s ease-in-out;
    overflow: hidden;
    width: 0;
}

.cta.visible {
    opacity: 1;
    width: 300px;
}

.cta.typing {
    opacity: 1;
    animation: typingLetter 0.7s linear forwards;
}

.cta.erasing {
    opacity: 1;
    animation: eraseLetter 1.5s linear forwards;
}

@keyframes typingLetter {
    from {
        width: 0;
    }

    to {
        width: 300px;
    }
}

@keyframes eraseLetter {
    from {
        width: 300px;
    }

    to {
        width: 0;
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.6s ease, transform 0.6s ease;
}

.fade-enter-from {
    opacity: 0;
    transform: translateY(-10px);
}

.fade-leave-to {
    opacity: 0;
    transform: translateY(10px);
}

.magazine {
    margin-top: 20px;
    min-height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
}

.overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(6px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 20px;
}

.container-magazine {
    min-height: 400px;
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 30px;
}

.container-magazine img {
    width: 250px;
    height: 350px;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    cursor: pointer;
}

.container-magazine img:hover {
    transform: scale(1.05);
    transition: transform 0.3s;
}

.section-follow-us {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    min-height: 500px;

}

.container-follow-us {
    border: 5px solid black;
    display: flex;
    align-items: center;
    border-radius: 10px 0px 0px 10px;
    justify-content: space-between;
    margin-top: 50px;
    width: 100%;
    max-width: 1170px;
    height: 350px;
    background-color: whitesmoke;

}

.follow-us {
    width: 50%;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    display: flex;
    margin-left: 50px;
    margin-top: 50px;
    font-size: 20px;
    min-width: 200px;
}

.follow-us h1 {
    margin: 0 0 20px 0;
}

.follow-us ul {
    list-style: none;
    padding: 0;
    margin: 0;
    text-align: center;
}

.follow-us li {
    margin: 10px 0;
}

.image-follow-us {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    padding: 20px;
    overflow: hidden;
}

.image-follow-us img {
    border-radius: 10px;
    width: 100%;
    height: auto;
    max-width: 600px;
    max-height: 400px;
    object-fit: cover;
}

@media (max-width: 1024px) {
    header {
        height: 350px;
    }

    .info-header {
        width: 500px;
        height: 120px;
        margin-left: 20px;
        padding: 15px;
        font-size: 12px;
    }

    .cta {
        font-size: 24px;
    }

    .cta.visible {
        width: 250px;
    }

    @keyframes typingLetter {
        to {
            width: 250px;
        }
    }

    @keyframes eraseLetter {
        from {
            width: 250px;
        }
    }

    .container-magazine img {
        width: 200px;
        height: 280px;
    }

    .section-follow-us {
        justify-content: center;
    }

    .container-follow-us {
        border-radius: 10px;
        max-width: 900px;
        height: auto;
        flex-direction: row;
        gap: 20px;
    }

    .follow-us {
        width: 45%;
        margin: 0;
        font-size: 16px;
    }

    .image-follow-us {
        width: 45%;
        padding: 10px;
    }

    .image-follow-us img {
        max-width: 100%;
        max-height: 250px;
    }
}

@media (max-width: 768px) {
    header {
        height: 300px;
        padding: 0 10px;
    }

    .info-header {
        width: 100%;
        max-width: 400px;
        height: 100px;
        margin: 0;
        padding: 15px;
        font-size: 11px;
    }

    .scene {
        height: 150px;
        margin-top: 0;
    }

    .car {
        width: 150px;
        bottom: -50px;
    }

    .cta {
        font-size: 18px;
        bottom: 35px;
    }

    .cta.visible {
        width: 200px;
    }

    @keyframes typingLetter {
        to {
            width: 200px;
        }
    }

    @keyframes eraseLetter {
        from {
            width: 200px;
        }
    }

    .magazine {
        margin-top: 10px;
        min-height: 300px;
    }

    .container-magazine {
        min-height: 300px;
        gap: 20px;
    }

    .container-magazine img {
        width: 180px;
        height: 250px;
    }

    .section-follow-us {
        min-height: auto;
        margin-top: 20px;
        justify-content: center;
    }

    .container-follow-us {
        flex-direction: column;
        border: 3px solid black;
        max-width: 100%;
        height: auto;
        margin: 20px;
        gap: 15px;
        padding: 15px;
    }

    .follow-us {
        width: 100%;
        margin: 0;
        font-size: 14px;
    }

    .image-follow-us {
        width: 100%;
        padding: 10px 0;
    }

    .image-follow-us img {
        width: 100%;
        max-width: 100%;
        height: auto;
        max-height: 200px;
        margin: 0;
    }
}

@media (max-width: 480px) {
    header {
        height: 250px;
    }

    .info-header {
        max-width: 100%;
        height: auto;
        padding: 12px;
        font-size: 10px;
    }

    .scene {
        height: 120px;
    }

    .car {
        width: 120px;
        bottom: -40px;
    }

    .cta {
        font-size: 14px;
        bottom: 25px;
    }

    .cta.visible {
        width: 150px;
    }

    @keyframes typingLetter {
        to {
            width: 150px;
        }
    }

    @keyframes eraseLetter {
        from {
            width: 150px;
        }
    }

    .container-magazine {
        flex-direction: column;
        gap: 15px;
    }

    .container-magazine img {
        width: 160px;
        height: 220px;
    }

    .container-follow-us {
        margin: 15px;
        padding: 15px;
    }

    .follow-us {
        font-size: 13px;
        margin: 0;
    }

    .follow-us h1 {
        font-size: 18px;
        margin-bottom: 10px;
    }

    .image-follow-us {
        width: 100%;
        padding: 10px 0;
    }

    .image-follow-us img {
        margin: 0;
        max-width: 100%;
        height: auto;
        max-height: 150px;
    }
}
</style>