<script>
  import delIcon from '$lib/assets/icons/trash.svg';
  import { removeReservationById } from '../store.js';

  export let id;
  export let customEventAfter = () => {};

  function onClickHandler(event) {
    event.stopPropagation();
    if (id) {
      removeReservationById(id);
    }
    customEventAfter();
  }
</script>

<button class="del-btn" on:click={onClickHandler}>
  <img src={delIcon} />
</button>

<style lang="scss">
  .del-btn {
    width: 60px;
    height: 60px;
    border-radius: 8px;
    background-color: #fff;
    border: none;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
</style>
