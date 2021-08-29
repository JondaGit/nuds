<script lang="ts">
    import { onMount } from 'svelte';
    import { from, map, switchMap } from 'rxjs';
    import "@kahi-ui/framework/dist/kahi-ui.framework.css";
    import {Button} from "@kahi-ui/framework";
    import { fade, scale } from 'svelte/transition';

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

    let sprintButtonsVisible: boolean = true;

    function sprintClick() {
        console.log("Sprint clicked");
        sprintButtonsVisible = !sprintButtonsVisible;
    }

</script>

<body>
    <img src="static/bg.jpg" alt="Countdown">
    <div class="counter-column">
        <span class="counter-title">Do odevzdání nudz 🍑 zbývá</span>
        <div class="counter">
            <div class="counter-item">
                <div class="counter-item-number">{days}</div>
                <div class="counter-item-text">Dny</div>
            </div>
            <div class="counter-item">
                <div class="counter-divider">:</div>
                <div class="counter-item-text" style="visibility: hidden;">T</div>
            </div>
            <div class="counter-item">
                <div class="counter-item-number">{hours}</div>
                <div class="counter-item-text">Hodiny</div>
            </div>
            <div class="counter-item">
                <div class="counter-divider">:</div>
                <div class="counter-item-text" style="visibility: hidden;">T</div>
            </div>
            <div class="counter-item">
                <div class="counter-item-number">{minutes}</div>
                <div class="counter-item-text">Minuty</div>
            </div>
            <div class="counter-item">
                <div class="counter-divider">:</div>
                <div class="counter-item-text" style="visibility: hidden;">T</div>
            </div>
            <div class="counter-item">
                <div class="counter-item-number">{seconds}</div>
                <div class="counter-item-text">Sekundy</div>
            </div>
        </div>
        <span class="counter-title" style="visibility: hidden;">D</span>
    </div>
    <p class="svatek-text">Dnes má svátek {svatek}</p> 
    <div class="buttons">
        <div class="button-sprint">
            <Button variation="clear" on:click="{sprintClick}">
                <i class="fa {sprintButtonsVisible?"fa-chevron-down":"fa-chevron-up"}"></i>
                Hodnocení sprintu
            </Button>
        </div>
        {#if sprintButtonsVisible}
            <div class="buttons-scores" transition:fade={{ duration: 500}}>
                <Button variation="clear" href="/sprint-0-20">0-20</Button>
                <Button variation="clear" href="/sprint-20-40">20-40</Button>
                <Button variation="clear" href="/sprint-40-60">40-60</Button>
                <Button variation="clear" href="/sprint-60-80">60-80</Button>
                <Button variation="clear" href="/sprint-80-100">80-100</Button>
                <Button variation="clear" href="/sprint-100-120">100-120</Button>
            </div>
        {/if}
    </div>
</body>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@200;400&display=swap');
    @import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");

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

    .counter-column {
        position: relative;
        display: flex;
        flex-direction: column;
    }

    .counter-title {
        font-size: 18px;
        font-family: 'Roboto Mono', monospace;
        color: white;
        opacity: 0.75;
        text-align: center;
        margin-bottom: 1vw;
    }

    .counter {
        display: inline-flex;
        justify-content: center;
		align-items: center;
    }    

    .counter-item {
        display: flex;
        flex-direction: column;

    }

    .counter-divider {
        font-size: 3vw;
        font-family: 'Roboto Mono', monospace;
        font-weight: 200;
    }

    .counter-item-number {
        font-size: 6vw;
        padding: 3.25vw;
        font-family: 'Roboto Mono', monospace;
        color: white;
    }
    .counter-item-text {
        font-size: 1.25vw;
        font-family: 'Roboto Mono', monospace;
        font-weight: 200;
        color: white;
        opacity: 0.75;
        text-align: center;
        text-transform: uppercase;
    }

    .svatek-text {
        position: absolute;
        font-size: 18px;
        font-family: 'Roboto Mono', monospace;
        color: ghostwhite;
        opacity: 0.75;
        top: 12px;
    }

    .buttons {
        position: absolute;
        bottom: 0px;
    }

    .buttons-scores {
        opacity: 1;
    }

    .button-sprint {
        display: flex;
        justify-content: center;
		align-items: center;
    }

</style>