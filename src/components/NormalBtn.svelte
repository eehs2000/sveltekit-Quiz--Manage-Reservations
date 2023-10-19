<script>
  import delIcon from '$lib/assets/icons/trash.svg';

  export let onClickEvent;
  export let label;

  function onClickHandler(event) {
    event.stopPropagation();
    onClickEvent();
  }
</script>

<button class="normal-btn" on:click={onClickHandler}>
  <span>{label}</span>
</button>

<style lang="scss">
  .normal-btn {
    width: 100%;
    height: 60px;
    border-radius: 8px;
    background-color: red;
    color: #fff;
    border: none;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
</style>
