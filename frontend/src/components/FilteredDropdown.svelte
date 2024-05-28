<script>
    import { createEventDispatcher, onMount, onDestroy } from 'svelte';
    let searchQuery = '';
    export let options = [];
    export let selected = '';
    const dispatcher = createEventDispatcher();

    let isOpen = false;
    let dropdown;

    function selectOption(option) {
        searchQuery = option.Name;
        dispatcher('select', option);
        isOpen = false;
    }

    $: filteredOptions = options.filter(option => 
        option.Name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    function handleClickOutside(event) {
        if (dropdown && !dropdown.contains(event.target)) {
            isOpen = false;
        }
    }

    onMount(() => {
        document.addEventListener('click', handleClickOutside, true);
    });

    onDestroy(() => {
        document.removeEventListener('click', handleClickOutside, true);
    });
</script>

<div class="relative inline-block w-full" bind:this={dropdown}>
    <input type="text" bind:value={searchQuery} placeholder="Search for a team..." on:focus={() => isOpen = true} class="w-full p-2 border rounded" />
    <div class={`absolute bg-white w-full shadow-md max-h-48 overflow-y-auto z-10 ${isOpen ? 'block' : 'hidden'}`}>
        {#each filteredOptions as option}
            <div on:click={() => selectOption(option)} class="p-2 cursor-pointer hover:bg-gray-200">{option.Name}</div>
        {/each}
    </div>
</div>
