<script>
    export let url;

    let data = [];

    async function fetchData() {
        const response = await fetch(url);
        const newData = await response.json();
        data = newData;
    }
</script>


<button on:click={fetchData}>Fetch Data</button>

<count>Total users: {data.length}</count>