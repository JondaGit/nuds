<script lang="ts">
    import { onMount } from 'svelte';
    import { from, map, switchMap } from 'rxjs';
    import "@kahi-ui/framework/dist/kahi-ui.framework.css";
    import {Button} from "@kahi-ui/framework";

    const DM = 1000 * 60 * 60 * 24;
    const HM = 1000 * 60 * 60;
    const MM = 1000 * 60;
    const SM = 1000;

    let currentTime = new Date();
    
    const destTime = new Date(2021,9,31,23,59);
    $: diffTime = Math.abs(destTime.valueOf() - currentTime.valueOf());

    let days: string;
    let hours: string;
    let minutes: string;
    let seconds: string;

    $: {
        days = Math.floor(diffTime / DM).toFixed(0).padStart(2,'0');
        diffTime -= +days * DM;
        hours = Math.floor(diffTime / HM).toFixed(0).padStart(2,'0');
        diffTime -= +hours * HM;
        minutes = Math.floor(diffTime / MM).toFixed(0).padStart(2,'0');
        diffTime -= +minutes * MM;
        seconds = Math.floor(diffTime / SM).toFixed(0).padStart(2,'0');
        diffTime -= +seconds * SM;
    };

    let svatek: string = "";

    onMount(async () => {
        const day: string = currentTime.getDate().toString().padStart(2,'0');
        const month: string = (currentTime.getMonth() + 1).toString().padStart(2,'0');
        let apiURL = `https://svatky.adresa.info/json?date=${day}${month}`;
        const response = from(fetch(apiURL));
        response.pipe(switchMap((data: Response) => from(data.json()))).subscribe({
            next: (data) => {
                svatek = data[0].name;
            }
        });

		const interval = setInterval(() => {
			currentTime = new Date();
		}, 10);

		return () => {
			clearInterval(interval);
		};
	});

</script>

<body>
    <img src="static/bg.jpg" alt="Countdown">
    <counter>{days} : {hours} : {minutes} : {seconds}</counter>
    <p class="svatek-text">Dnes má svátek {svatek}</p> 
    <div class="buttons">
        <Button variation="clear" href="/sprint-0-20">0-20</Button>
        <Button variation="clear" href="/sprint-20-40">20-40</Button>
        <Button variation="clear" href="/sprint-40-60">40-60</Button>
        <Button variation="clear" href="/sprint-60-80">60-80</Button>
        <Button variation="clear" href="/sprint-80-100">80-100</Button>
        <Button variation="clear" href="/sprint-100-120">100-120</Button>
    </div>
</body>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400&display=swap');

    body {
        display: flex;
        flex-direction: column;
        justify-content: center;
		align-items: center;
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
		left: 0;
        margin: 0;
        background-color: black;
    }
    
    img {
        width: 100%;
        height: 100%;
        
        position: absolute;
        object-fit: cover;
        filter: opacity(0.25) sepia(20%);
    }

    counter {
        position: relative;
        font-size: 6vw;
        font-family: 'Roboto Mono', monospace;
        color: white;
    }    

    .svatek-text {
        position: absolute;
        font-family: 'Roboto Mono', monospace;
        color: ghostwhite;
        top: 12px;
    }

    .buttons {
        position: absolute;
        bottom: 0;
    }
</style>