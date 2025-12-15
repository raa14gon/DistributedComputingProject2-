<template>
    <nav>
        <div class="logo">
            <h2>70's</h2>
            <h3>CarCulture</h3>
        </div>

        <div class="links">
            <a href="/">Home</a>
            <a href="/Cars">Cars </a>
            <a href="/VintageRacing">Vintage Racing</a>
        </div>
    </nav>
</template>

<script>
export default {
    name: "Menu"
}
</script>

<style>
nav {
    align-items: center;
    border-top: 8px solid black;
    border-bottom: 8px solid black;
    display: flex;
    height: 70px;
    background-color: #F58F56;
    
}

.logo {
    margin-left: 20px;
    gap: 0px !important;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 65px;
    height: 65px;
    background-color: white;
    border-radius: 50%;
}

.logo h2 {
    font-weight: bold;
    font-size: 20px;
    
}

.logo h3 {
   
    font-weight: bold;
    font-size: 12px;
}

.links {
    display: flex;
    margin-left: 30px;
    gap: 20px;
}

.links a {
    font-weight: bold;
    text-decoration: underline;
    text-decoration: none;
    color: black;
    font-weight: bold;
    font-size: 20px;

    &:hover {
        color: white;
    }
}
</style>