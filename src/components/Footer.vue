<template>
    <footer>
        <div class="container-footer">
            <div class="info-footer">
                <h3>Company Information</h3>
                <ul  class="item-list-footer">
                    <li>HarmoniArt Store Ltd.</li>
                    <li>123 Aurora Avenue, Harmony District</li>
                    <li>Solaria City, CA 90452 – United States</li>
                    <li>Email: support@harmoniarts.shop</li>
                    <li>Phone: +1 (555) 298-0047</li>
                </ul>
            </div>
            <div class="info-footer">
                <h3>Customer Support</h3>
                <ul class="item-list-footer">
                    <li>Monday–Friday: 9:00 AM – 6:00 PM</li>
                    <li>Saturday: 10:00 AM – 4:00 PM</li>
                    <li>Sunday: Closed</li>
                </ul>
            </div>
            <div class="info-footer">
                <h3>About HarmoniArts</h3>
                <ul class="item-list-footer">
                    <li>At HarmoniArts, we connect creativity</li>
                    <li>and craftsmanship.</li>
                    <li>From instruments to artistic </li>
                    <li>accessories, every product is curated</li>
                    <li>to inspire musicians and creators</li>
                    <li>around the world.</li>
                </ul>
            </div>
            <div class="info-footer">
                <h3>Legal</h3>
                <ul class="item-list-footer">
                    <li>Privacy Policy</li>
                    <li>Terms & Conditions</li>
                    <li>Cookie Policy</li>
                    <li>Warranty Information</li>
                </ul>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: "Footer"
}
</script>

<style>
footer {
    margin-top: 20px;
    padding: 20px 10px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: #F58F56;
    border-top: 8px solid black;
    border-bottom: 8px solid black;
}

.container-footer {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    align-items: start;
    width: 100%;
    margin-left: 10px;
    gap: 30px;
    padding: 0 20px;
}

.info-footer {
    text-align: left;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-right: 20px;
}

.info-footer h3 {
    margin: 0 0 10px 0;
    font-size: 16px;
}

.item-list-footer {
    font-size: 12px;
    list-style: none;
    text-align: left;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.item-list-footer li {
    line-height: 1.4;
    font-size: 12px;
}

@media (max-width: 1024px) {
    .container-footer {
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
        margin-left: 0;
    }

    .info-footer {
        margin-right: 10px;
    }

    .info-footer h3 {
        font-size: 14px;
    }

    .item-list-footer {
        font-size: 11px;
    }
}

@media (max-width: 768px) {
    footer {
        padding: 15px 5px;
    }

    .container-footer {
        grid-template-columns: repeat(2, 1fr);
        gap: 15px;
        margin-left: 0;
        padding: 0 10px;
    }

    .info-footer {
        margin-right: 5px;
    }

    .info-footer h3 {
        font-size: 13px;
        margin-bottom: 8px;
    }

    .item-list-footer {
        font-size: 10px;
        gap: 6px;
    }

    .item-list-footer li {
        font-size: 10px;
        line-height: 1.3;
    }
}

@media (max-width: 480px) {
    footer {
        padding: 10px 5px;
        border-top: 5px solid black;
        border-bottom: 5px solid black;
    }

    .container-footer {
        grid-template-columns: 1fr;
        gap: 10px;
        margin-left: 0;
        padding: 0 5px;
    }

    .info-footer {
        margin-right: 0;
    }

    .info-footer h3 {
        font-size: 12px;
        margin-bottom: 5px;
    }

    .item-list-footer {
        font-size: 9px;
        gap: 4px;
    }

    .item-list-footer li {
        font-size: 9px;
        line-height: 1.2;
    }
}
</style>