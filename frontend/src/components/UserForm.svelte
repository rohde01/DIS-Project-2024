<script>
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';
    import FilteredDropdown from './FilteredDropdown.svelte';

    let email = '';
    let firstName = '';
    let lastName = '';
    let company = '';
    let subscriptionType = '';
    let selectedTeam = null;
    let password = '';
    let teams = [];
    let payload = null;
    let teamError = '';
    let successMessage = '';
    let showOptionalFields = false;
    let address = '';
    let postalCode = '';
    let city = '';
    let position = '';
    let wage = '';
    let isOfficeCommunityMember = 'No';
    let officeCommunityName = '';

    const dispatcher = createEventDispatcher();

    onMount(async () => {
        const response = await fetch('http://localhost:3000/team');
        teams = await response.json();
        password = generatePassword();
    });

    function validateEmail(email) {
        const regex = /\S+@\S+\.\S+/;
        return regex.test(email);
    }

    function generatePassword() {
        const randomNumbers = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        return `PingoWelcome${randomNumbers}`;
    }

    async function handleSubmit() {
        if (!validateEmail(email)) {
            alert('Please enter a valid email.');
            return;
        }

        if (!selectedTeam) {
            teamError = 'Please select a valid team.';
            return;
        } else {
            teamError = '';
        }

        payload = {
            email,
            firstName,
            lastName,
            company,
            subscriptionType: subscriptionType === '2' ? '1' : subscriptionType,
            team: selectedTeam,
            password,
            selectedTeamId: selectedTeam.Id,
            ...(subscriptionType === '2' && {
                IsFreemiumPlusMember: "1",
                IsFreemiumPlusComplyMember: "1"
            }),
            ...(showOptionalFields && {
                address,
                postalCode,
                city,
                position,
                wage,
                isOfficeCommunityMember: isOfficeCommunityMember === 'Yes' ? 1 : 0,
                ...(isOfficeCommunityMember === 'Yes' && { officeCommunityName })
            })
        };

        try {
            const response = await fetch('http://localhost:3000/create-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                successMessage = `Successfully onboarded ${firstName}`;
                dispatcher('submit', payload);
                console.log('Payload:', payload);
            } else {
                const errorMessage = await response.text();
                alert(`Failed to create user: ${errorMessage}`);
            }
        } catch (error) {
            alert('An error occurred');
            console.error('Error:', error);
        }
    }

    function handleTeamSelect(event) {
        selectedTeam = event.detail;
        teamError = '';
    }

    function resetForm() {
        email = '';
        firstName = '';
        lastName = '';
        company = '';
        subscriptionType = '';
        selectedTeam = null;
        password = generatePassword();
        teamError = '';
        payload = null;
        successMessage = '';
        showOptionalFields = false;
        address = '';
        postalCode = '';
        city = '';
        position = '';
        wage = '';
        isOfficeCommunityMember = 'No';
        officeCommunityName = '';
    }
</script>

{#if successMessage}
    <div class="text-center mt-5">
        <p class="text-green-600 text-xl">{successMessage}</p>
        <button class="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" on:click={resetForm}>Create New User</button>
    </div>
{:else}
    <form on:submit|preventDefault={handleSubmit} class="flex flex-col w-80 mx-auto">
        <div class="mb-3">
            <label for="email" class="block mb-1">Email:</label>
            <input type="email" id="email" bind:value={email} required class="w-full p-2 border rounded" />
        </div>
        <div class="mb-3">
            <label for="firstName" class="block mb-1">First Name:</label>
            <input type="text" id="firstName" bind:value={firstName} required class="w-full p-2 border rounded" />
        </div>
        <div class="mb-3">
            <label for="lastName" class="block mb-1">Last Name:</label>
            <input type="text" id="lastName" bind:value={lastName} required class="w-full p-2 border rounded" />
        </div>
        <div class="mb-3">
            <label for="company" class="block mb-1">Company:</label>
            <input type="text" id="company" bind:value={company} class="w-full p-2 border rounded" />
        </div>
        <div class="mb-3">
            <label for="subscriptionType" class="block mb-1">Subscription Type:</label>
            <select id="subscriptionType" bind:value={subscriptionType} required class="w-full p-2 border rounded">
                <option value="" disabled>Select Subscription Type</option>
                <option value="1">Freemium</option>
                <option value="3">Premium</option>
                <option value="2">Comply</option>
                <option value="4">TODO:Comply-Flex</option>
            </select>
        </div>
        <div class="mb-3">
            <label for="team" class="block mb-1">Team:</label>
            <FilteredDropdown options={teams} on:select={handleTeamSelect} />
            {#if teamError}
                <div class="text-red-600 mt-1">{teamError}</div>
            {/if}
        </div>
        <div class="mb-3">
            <label for="password" class="block mb-1">Password:</label>
            <input type="text" id="password" bind:value={password} readonly class="w-full p-2 border rounded" />
        </div>
        <div class="mb-3 text-center">
            <button type="button" class="px-2 py-1 bg-transparent text-gray-700" on:click={() => showOptionalFields = !showOptionalFields}>
            {showOptionalFields ? 'Hide Optional Fields' : 'Show Optional Fields'}
            <span class="ml-1">{showOptionalFields ? '▲' : '▼'}</span>
            </button>
        </div>
        
        {#if showOptionalFields}
            <div class="mb-3">
                <label for="address" class="block mb-1">Address:</label>
                <input type="text" id="address" bind:value={address} class="w-full p-2 border rounded" />
            </div>
            <div class="mb-3">
                <label for="postalCode" class="block mb-1">Postal Code:</label>
                <input type="text" id="postalCode" bind:value={postalCode} class="w-full p-2 border rounded" />
            </div>
            <div class="mb-3">
                <label for="city" class="block mb-1">City:</label>
                <input type="text" id="city" bind:value={city} class="w-full p-2 border rounded" />
            </div>
            <div class="mb-3">
                <label for="position" class="block mb-1">Position:</label>
                <input type="text" id="position" bind:value={position} class="w-full p-2 border rounded" />
            </div>
            <div class="mb-3">
                <label for="wage" class="block mb-1">Wage:</label>
                <input type="text" id="wage" bind:value={wage} class="w-full p-2 border rounded" />
            </div>
            <div class="mb-3">
                <label for="isOfficeCommunityMember" class="block mb-1">Is Office Community Member?</label>
                <select id="isOfficeCommunityMember" bind:value={isOfficeCommunityMember} class="w-full p-2 border rounded">
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                </select>
            </div>
            {#if isOfficeCommunityMember === 'Yes'}
                <div class="mb-3">
                    <label for="officeCommunityName" class="block mb-1">Office Community Name:</label>
                    <input type="text" id="officeCommunityName" bind:value={officeCommunityName} class="w-full p-2 border rounded" />
                </div>
            {/if}
        {/if}
        <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Create User</button>
    </form>
{/if}

{#if payload}
    <pre class="bg-gray-100 p-4 border mt-5">{JSON.stringify(payload, null, 2)}</pre>
{/if}
