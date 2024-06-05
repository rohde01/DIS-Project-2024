<script>
    import FetchButton from './components/FetchButton.svelte';
    import LineChart from './components/LineChart.svelte';
    import UserForm from './components/UserForm.svelte';
    import UpdateUserForm from './components/UpdateTeamUsers.svelte';
    import DeleteTeams from './components/DeleteTeams.svelte'; // Correct import for the new component
</script>

<style>
    .form-container {
        display: flex;
        justify-content: space-between;  
    }
</style>

<div class="form-container">
    <UserForm />
    <UpdateUserForm /> 
    <DeleteTeams />
</div>

<LineChart />
