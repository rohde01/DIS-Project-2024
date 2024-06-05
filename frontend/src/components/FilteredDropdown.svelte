<script>
    import { createEventDispatcher, onMount, onDestroy } from 'svelte';
    let searchQuery = '';
    export let options = [];
    export let selected = [];
    const dispatcher = createEventDispatcher();

    let isOpen = false;
    let dropdown;

    function selectOption(option) {
        if (!selected.includes(option)) {
            selected = [...selected, option];
        }
        searchQuery = ''; // Clear the search input after selection
        dispatcher('select', option);
        isOpen = false;
    }

    function removeOption(option) {
        selected = selected.filter(item => item !== option);
        dispatcher('remove', option);
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
    {#if selected.length > 0}
        <div class="mt-2">
            {#each selected as option}
                <div class="inline-block bg-gray-200 p-1 m-1 rounded">
                    {option.Name} <span class="cursor-pointer" on:click={() => removeOption(option)}>x</span>
                </div>
            {/each}
        </div>
    {/if}
</div>
