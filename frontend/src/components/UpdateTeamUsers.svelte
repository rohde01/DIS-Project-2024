<script lang="ts">
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';
    import FilteredDropdown from './FilteredDropdown.svelte';

    let userSubscriptionType = '';
    let isFreemiumPlusMember = '';
    let isFreemiumPlusComplyMember = '';
    let isOfficeCommunityUser = '';
    let officeCommunityName = '';
    let selectedTeam = null;
    let teams = [];
    let teamError = '';
    let successMessage = '';

    interface Payload {
        SpecificTeamId: string;
        UserSubscriptionType: string;
        IsFreemiumPlusMember: string;
        IsFreemiumPlusComplyMember: string;
        IsOfficeCommunityUser: string;
        OfficeCommunityName: string;
    }

    let payload: Payload = null;

    const dispatcher = createEventDispatcher();

    onMount(async () => {
        const response = await fetch('http://localhost:3001/team');
        teams = await response.json();
    });

    async function handleSubmit() {
        if (!selectedTeam) {
            teamError = 'Please select a valid team.';
            return;
        } else {
            teamError = '';
        }

        payload = {
            SpecificTeamId: selectedTeam.Id,
            UserSubscriptionType: userSubscriptionType || '',
            IsFreemiumPlusMember: isFreemiumPlusMember || '',
            IsFreemiumPlusComplyMember: isFreemiumPlusComplyMember || '',
            IsOfficeCommunityUser: isOfficeCommunityUser || '',
            OfficeCommunityName: officeCommunityName || ''
        };

        try {
            const response = await fetch('http://localhost:3001/update-team-users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                successMessage = `Successfully updated users in team ${selectedTeam.name}`;
                dispatcher('submit', payload);
                console.log('Payload:', payload);
            } else {
                const errorMessage = await response.text();
                alert(`Failed to update users: ${errorMessage}`);
            }
        } catch (error) {
            alert('An error occurred');
            console.error('Error:', error);
        }
    }

    function handleTeamSelect(event: CustomEvent) {
        selectedTeam = event.detail;
        teamError = '';
    }

    function resetForm() {
        userSubscriptionType = '';
        isFreemiumPlusMember = '';
        isFreemiumPlusComplyMember = '';
        isOfficeCommunityUser = '';
        officeCommunityName = '';
        selectedTeam = null;
        teamError = '';
        payload = null;
        successMessage = '';
    }
</script>

{#if successMessage}
    <div class="text-center mt-5">
        <p class="text-green-600 text-xl">{successMessage}</p>
        <button class="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" on:click={resetForm}>Update Another Team</button>
    </div>
{:else}
    <form on:submit|preventDefault={handleSubmit} class="flex flex-col w-80 mx-auto">
        <div class="mb-3">
            <label for="userSubscriptionType" class="block mb-1">User Subscription Type:</label>
            <select id="userSubscriptionType" bind:value={userSubscriptionType} class="w-full p-2 border rounded">
                <option value="" disabled>Select Subscription Type</option>
                <option value="1">Freemium</option>
                <option value="3">Premium</option>
                <option value="2">Comply</option>
                <option value="4">TODO:Comply-Flex</option>
            </select>
        </div>
        <div class="mb-3">
            <label for="isFreemiumPlusMember" class="block mb-1">Is Freemium Plus Member:</label>
            <select id="isFreemiumPlusMember" bind:value={isFreemiumPlusMember} class="w-full p-2 border rounded">
                <option value="">Select</option>
                <option value="0">No</option>
                <option value="1">Yes</option>
            </select>
        </div>
        <div class="mb-3">
            <label for="isFreemiumPlusComplyMember" class="block mb-1">Is Freemium Plus Comply Member:</label>
            <select id="isFreemiumPlusComplyMember" bind:value={isFreemiumPlusComplyMember} class="w-full p-2 border rounded">
                <option value="">Select</option>
                <option value="0">No</option>
                <option value="1">Yes</option>           
            </select>
        </div>
        <div class="mb-3">
            <label for="isOfficeCommunityUser" class="block mb-1">Is Office Community User:</label>
            <select id="isOfficeCommunityUser" bind:value={isOfficeCommunityUser} class="w-full p-2 border rounded">
                <option value="">Select</option>
                <option value="0">No</option>
                <option value="1">Yes</option>
            </select>
        </div>
        <div class="mb-3">
            <label for="officeCommunityName" class="block mb-1">Office Community Name:</label>
            <input type="text" id="officeCommunityName" bind:value={officeCommunityName} class="w-full p-2 border rounded" />
        </div>
        <div class="mb-3">
            <label for="team" class="block mb-1">Team:</label>
            <FilteredDropdown options={teams} on:select={handleTeamSelect} />
            {#if teamError}
                <div class="text-red-600 mt-1">{teamError}</div>
            {/if}
        </div>
        <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Update Users</button>
    </form>
{/if}

{#if payload}
    <pre class="bg-gray-100 p-4 border mt-5">{JSON.stringify(payload, null, 2)}</pre>
{/if}
