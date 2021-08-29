<script lang="ts" context="module">
    const scores: Map<string,string> = new Map([
        ["0-20","https://media3.giphy.com/media/IwAZ6dvvvaTtdI8SD5/giphy.gif"],
        ["20-40","https://media3.giphy.com/media/IwAZ6dvvvaTtdI8SD5/giphy.gif"],
        ["40-60","http://mrwgifs.com/wp-content/uploads/2013/06/Steve-Dance-Celebration-Gif-On-Blues-Clues.gif"],
        ["60-80","https://i.gifer.com/RYd.gif"],
        ["80-100","https://media3.giphy.com/media/IwAZ6dvvvaTtdI8SD5/giphy.gif"],
        ["100-120","https://www.icegif.com/wp-content/uploads/party-icegif.gif"]
    ]);

    let address: string = "";

    export async function load({ page }) {
		address = scores.get(page.params.score);
        return {};
	}


</script>


<body>
    <img src="{address}"/>
</body>


<style>
    img {
        width: 100%;
        height: 100%;
        position: absolute;
        object-fit: contain;
    }
</style>