<script lang="ts">
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';
    import FilteredDropdown from './FilteredDropdown.svelte';

    let selectedTeams = [];
    let teams = [];
    let teamIds = [];
    let teamNames = [];
    let teamError = '';
    let successMessage = '';

    const dispatcher = createEventDispatcher();

    onMount(async () => {
        const response = await fetch('http://localhost:3001/team');
        teams = await response.json();
    });

    function handleTeamSelect(event: CustomEvent) {
        const selectedTeam = event.detail;
        console.log("Selected Team: ", selectedTeam);
        if (selectedTeam && !teamIds.includes(selectedTeam.Id)) {
            teamIds = [...teamIds, selectedTeam.Id];
            teamNames = [...teamNames, selectedTeam.Name];
            console.log("teamIds: ", teamIds);
            console.log("teamNames: ", teamNames);
            teamError = '';
        }
    }

    function handleTeamRemove(event: CustomEvent) {
        const removedTeam = event.detail;
        console.log("Removed Team: ", removedTeam);
        const index = teamIds.indexOf(removedTeam.Id);
        if (index !== -1) {
            teamIds = teamIds.filter(id => id !== removedTeam.Id);
            teamNames = teamNames.filter(name => name !== removedTeam.Name);
            console.log("Updated teamIds: ", teamIds);
            console.log("Updated teamNames: ", teamNames);
        }
    }

    async function handleDeleteTeams() {
        if (teamIds.length === 0) {
            teamError = 'Please select at least one team to delete.';
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/delete-teams', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ TeamIdList: teamIds })
            });

            if (response.ok) {
                const result = await response.json();
                successMessage = result.message;
                teamIds = [];
                teamNames = [];
                dispatcher('submit');
            } else {
                const errorMessage = await response.text();
                alert(`Failed to delete teams: ${errorMessage}`);
            }
        } catch (error) {
            alert('An error occurred');
            console.error('Error:', error);
        }
    }

    function resetForm() {
        teamIds = [];
        teamNames = [];
        teamError = '';
        successMessage = '';
    }
</script>

{#if successMessage}
    <div class="text-center mt-5">
        <p class="text-green-600 text-xl">{successMessage}</p>
        <button class="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" on:click={resetForm}>Delete More Teams</button>
    </div>
{:else}
    <form on:submit|preventDefault={handleDeleteTeams} class="flex flex-col w-80 mx-auto">
        <div class="mb-3">
            <label for="team" class="block mb-1">Team:</label>
            <FilteredDropdown options={teams} on:select={handleTeamSelect} on:remove={handleTeamRemove} />
            {#if teamError}
                <div class="text-red-600 mt-1">{teamError}</div>
            {/if}
        </div>

        {#if teamIds.length > 0}
            <div class="mt-5">
                <h3 class="mb-2">Teams to Delete:</h3>
                <ul class="bg-gray-100 p-4 border">
                    {#each teamNames as teamName, index (index)}
                        <li>{teamName}</li>
                    {/each}
                </ul>
                <button type="submit" class="mt-3 bg-red-500 text-white py-2 px-4 rounded">Delete Selected Teams</button>
            </div>
        {/if}
    </form>
{/if}
