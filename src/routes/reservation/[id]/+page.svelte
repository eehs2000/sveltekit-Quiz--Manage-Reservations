<script>
  import { page } from '$app/stores';
  import ReservationPage from '../../../components/ReservationPage.svelte';

  const { id } = $page.params;
</script>

<ReservationPage title={'Edit'} {id} />
