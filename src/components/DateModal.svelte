<script>
  import { createEventDispatcher } from 'svelte';
  import DelBtn from './DelBtn.svelte';
  import NormalBtn from './NormalBtn.svelte';

  const dispatch = createEventDispatcher();

  let selectedDate = new Date();
  let selectedTime;
  function saveDateAndTime() {
    const datetime = {
      date: selectedDate,
      time: selectedTime,
    };
    dispatch('save', datetime);
  }

  function deleteDateAndTime() {
    dispatch('delete');
  }
</script>

<div class="modal-layout">
  <div class="modal-card">
    <div class="modal-div">
      <input class="modal-input" type="date" bind:value={selectedDate} />
    </div>
    <div class="modal-div">
      <input class="modal-input" type="time" bind:value={selectedTime} />
    </div>
    <div class="btn-div">
      <DelBtn customEventAfter={deleteDateAndTime} />
      <NormalBtn label={'Save'} onClickEvent={saveDateAndTime} />
    </div>
  </div>
</div>

<style lang="scss">
  .modal-layout {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    .modal-card {
      z-index: 11;
      width: 300px;
      height: 180px;
      background-color: #fff;
      padding: 20px 12px;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }
    .btn-div {
      display: flex;
      gap: 8px;
    }
    .modal-btn {
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
    .modal-div {
      // display: flex;
      // align-items: center;
      // gap: 4px;
      .modal-input {
        width: 100%;
        height: 45px;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
      }
    }
  }
</style>
