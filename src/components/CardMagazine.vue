<template>
    <div class="container">
        <button class="close" @click="$emit('close')">X</button>
        <div class="container-card">
            <div class="card-history">
                <h3>{{ magazine.title }}</h3>

                <p>{{ magazine.textHistory }}</p>
            </div>
            <div class="card-curious">
                <h3>{{ magazine.titleCurious }}</h3>
                <p>{{ magazine.textCurious }}</p>
            </div>
        </div>
        <div>
            <p>{{ magazine.author }}</p>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    magazine: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>
.close {
    display: flex;
    background-color: whitesmoke;
    font-size: 30px;
    border: none;
    padding: 5px 10px;
    font-weight: 500;
    cursor: pointer;
    float: right;
    transition: background-color 0.3s;
}

.close:hover {
    background-color: #e0e0e0;
}

.container {
    background: whitesmoke;
    padding: 20px;
    border-radius: 10px;
    max-height: 80vh;
    overflow-y: auto;
    max-width: 900px;
    width: 100%;
}

.container::-webkit-scrollbar {
    width: 8px;
}

.container::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
}

.container::-webkit-scrollbar-thumb {
    background: #F58F56;
    border-radius: 10px;
}

.container::-webkit-scrollbar-thumb:hover {
    background: #d96e3e;
}

.container-card {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    margin-top: 20px;
    clear: both;
}

.card-history,
.card-curious {
    width: 50%;
}

.card-history h3,
.card-curious h3 {
    margin: 0 0 15px 0;
    font-size: 18px;
    color: #333;
}

.card-history p,
.card-curious p {
    margin: 0;
    font-size: 14px;
    line-height: 1.6;
    color: #555;
    text-align: justify;
}

.container > p {
    margin: 20px 0 0 0;
    font-weight: bold;
    font-size: 14px;
    clear: both;
}

/* Media Queries - Tablets */
@media (max-width: 1024px) {
    .container {
        max-height: 75vh;
        padding: 15px;
    }

    .close {
        font-size: 24px;
        padding: 3px 8px;
    }

    .container-card {
        gap: 15px;
    }

    .card-history h3,
    .card-curious h3 {
        font-size: 16px;
    }

    .card-history p,
    .card-curious p {
        font-size: 13px;
    }
}

/* Media Queries - Mobile */
@media (max-width: 768px) {
    .container {
        max-height: 70vh;
        padding: 12px;
        border-radius: 8px;
    }

    .close {
        font-size: 20px;
        padding: 2px 6px;
    }

    .container-card {
        flex-direction: column;
        gap: 15px;
        margin-top: 15px;
    }

    .card-history,
    .card-curious {
        width: 100%;
    }

    .card-history h3,
    .card-curious h3 {
        font-size: 15px;
        margin-bottom: 10px;
    }

    .card-history p,
    .card-curious p {
        font-size: 12px;
        line-height: 1.5;
    }

    .container > p {
        font-size: 13px;
        margin-top: 15px;
    }
}

/* Media Queries - Small Mobile */
@media (max-width: 480px) {
    .container {
        max-height: 65vh;
        padding: 10px;
        border-radius: 6px;
    }

    .close {
        font-size: 18px;
        padding: 2px 5px;
    }

    .container-card {
        gap: 12px;
        margin-top: 12px;
    }

    .card-history,
    .card-curious {
        width: 100%;
    }

    .card-history h3,
    .card-curious h3 {
        font-size: 13px;
        margin-bottom: 8px;
    }

    .card-history p,
    .card-curious p {
        font-size: 11px;
        line-height: 1.4;
    }

    .container > p {
        font-size: 12px;
        margin-top: 12px;
    }
}
</style>