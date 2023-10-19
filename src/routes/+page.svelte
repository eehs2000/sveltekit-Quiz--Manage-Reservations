<script>
  import { reservations } from '../store.js';
  import { goto } from '$app/navigation';
  import { formatReservationDate } from '$lib/utils/dateUtil.js';

  import addIcon from '$lib/assets/icons/add.svg';
  import closeIcon from '$lib/assets/icons/close.svg';
  import groupIcon from '$lib/assets/icons/group.svg';
  import calendarIcon from '$lib/assets/icons/event_available.svg';
  import phoneIcon from '$lib/assets/icons/phone.svg';
  import noteIcon from '$lib/assets/icons/edit.svg';

  import DelBtn from '../components/DelBtn.svelte';
  import NormalBtn from '../components/NormalBtn.svelte';

  function navigateToNewReservation() {
    goto('/reservation/new');
  }

  function navigateToReservationById(id) {
    goto(`/reservation/${id}`);
  }

  function navigateToClosed() {
    goto(`/close`);
  }

  function setSeated(id) {
    //앉았다고 api쏘는 부분
  }
</script>

<div class="normal-layout">
  <div class="header-style">
    <button class="header-new-btn" on:click={navigateToNewReservation}>
      <img src={addIcon} />
      <span>New Reservation</span>
    </button>
    <div class="header-text-container">
      <h1 class="header-text">Reservation</h1>
      {#if $reservations.length > 0}
        <span class="reservation-count">{$reservations.length}</span>
      {/if}
    </div>
    <button class="header-close-btn" on:click={navigateToClosed}>
      <img src={closeIcon} />
    </button>
  </div>
  <div class="reservation-list">
    {#each $reservations as reservation}
      <div
        class="rev-info-card"
        on:click={navigateToReservationById(reservation.id)}
      >
        <div class="name-phone">
          <span class="name-text">{reservation.name}</span>
          <div class="phone-div">
            <img src={phoneIcon} />
            <span>{reservation.phone}</span>
          </div>
        </div>
        <div class="icon-with-text">
          <img src={calendarIcon} />
          <span>{formatReservationDate(reservation.date)}</span>
        </div>
        <div class="icon-with-text">
          <img src={groupIcon} />
          <span>{reservation.count}</span>
        </div>
        <div class="text-only">
          <div>
            {#if reservation.table.length > 0}
              <span>Reserved Table</span>
              {#each reservation.table as tableInfo, index}
                <span>{tableInfo.no}</span>
                {#if index < reservation.table.length - 1}
                  ,&nbsp;
                {/if}
              {/each}
              <span>•</span>
              <span>Floor</span>
              <span>{reservation.table[0].floor}</span>
            {:else}
              <span class="text-with-opacity">No selected table</span>
            {/if}
          </div>
        </div>
        {#if reservation.note}
          <div class="icon-with-text">
            <span>{reservation.note}</span>
            <img src={noteIcon} />
          </div>
        {:else}
          <div style="min-height: 32px;"></div>
        {/if}
        <div class="btns-container">
          <DelBtn id={reservation.id} />
          <NormalBtn
            label={'Seated'}
            onClickEvent={setSeated(reservation.id)}
          />
        </div>
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  .normal-layout {
    background-color: #e0e0e0;
    min-height: 100vh;
  }
  .header-style {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80px;
    background-color: #fff;
    position: relative;
  }
  .header-text-container {
    position: relative;
  }
  .header-text {
    color: #353839;
    font-weight: 400;
  }
  .header-new-btn {
    display: flex;
    align-items: center;
    position: absolute;
    top: 4px;
    left: 20px;
    gap: 8px;
    background-color: #fff;
    color: red;
    padding: 20px 12px;
    border-radius: 8px;
    font-size: 16px;
    border: none;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    cursor: pointer;
  }
  .header-close-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    background-color: #fff;
    border: none;
    cursor: pointer;
  }
  .reservation-count {
    position: absolute;
    background-color: red;
    color: white;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    top: 28px;
    left: 170px;
  }
  .reservation-list {
    padding: 20px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
  .rev-info-card {
    padding: 24px;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    cursor: pointer;
    .name-phone {
      display: flex;
      align-items: center;
      gap: 20px;
      .name-text {
        font-weight: 500;
      }
      .phone-div {
        display: flex;
        align-items: center;
        gap: 2px;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        padding: 12px 20px;
        border-radius: 20px;
        background-color: #fefefe;
      }
    }
    .icon-with-text {
      display: flex;
      align-items: center;
      padding-top: 8px;
      gap: 4px;
    }
    .text-only {
      padding-top: 8px;
    }
    .text-with-opacity {
      opacity: 0.7;
    }
    .btns-container {
      display: flex;
      gap: 20px;
      padding-top: 20px;
    }
  }
</style>
