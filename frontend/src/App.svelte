<script>
        import FetchButton from './components/FetchButton.svelte';
        import LineChart from './components/LineChart.svelte';
</script>
    
<FetchButton url="http://localhost:3000/customer/data?UserSubscriptionType=3" />

<LineChart url="http://localhost:3000/customer/data?UserSubscriptionType=3" />