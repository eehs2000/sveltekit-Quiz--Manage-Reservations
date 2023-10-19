<script>
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { tableList } from '../store.js';
  import backIcon from '$lib/assets/icons/keyboard_backspace.svg';
  import closeIcon from '$lib/assets/icons/close.svg';
  import calendarIcon from '$lib/assets/icons/event_available.svg';
  import {
    reservations,
    updateReservationById,
    addNewReservation,
  } from '../store.js';
  import { formatReservationDate } from '$lib/utils/dateUtil.js';
  import DelBtn from '../components/DelBtn.svelte';
  import DateModal from '../components/DateModal.svelte';

  export let title;
  export let id;

  let isDataChanged = false;

  let initialData = {
    id: 0,
    name: '',
    phone: '',
    date: '',
    count: 0,
    table: [],
    note: '',
  };

  let data = {
    id: 0,
    name: '',
    phone: '',
    date: '',
    count: 0,
    table: [],
    note: '',
  };

  function navigateToHome() {
    goto('/');
  }

  function navigateToClosed() {
    goto(`/close`);
  }

  function increase() {
    data.count += 1;
  }

  function decrease() {
    if (data.count > 0) {
      data.count -= 1;
    }
  }

  let isSelectShowing = false;

  function selectTable(table) {
    if (!data.table.some((t) => t.no === table.no && t.floor === table.floor)) {
      data.table = [...data.table, table];
    }
  }

  function removeTable(tableToRemove) {
    data.table = data.table.filter(
      (table) =>
        table.no !== tableToRemove.no || table.floor !== tableToRemove.floor,
    );
  }

  function toggleDropdown() {
    isSelectShowing = !isSelectShowing;
  }

  function closeDropdown() {
    isSelectShowing = false;
  }

  function handleOutsideClick(event) {
    if (!event.target.closest('.dropdown')) {
      closeDropdown();
    }
  }

  $: {
    isDataChanged = JSON.stringify(data) !== JSON.stringify(initialData);
  }

  onMount(() => {
    if (id !== undefined) {
      const foundReservation = $reservations.find(
        (res) => res.id === Number(id),
      );
      if (foundReservation) {
        data = {
          id: foundReservation.id,
          name: foundReservation.name,
          phone: foundReservation.phone,
          date: foundReservation.date,
          count: foundReservation.count,
          table: [...foundReservation.table],
          note: foundReservation.note,
        };
        initialData = { ...data };
      }
    }

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  });

  let isFormValid = false;

  $: isFormValid =
    data.name !== '' && data.phone !== '' && data.date !== '' && data.count > 0;

  function updateData() {
    if (isFormValid) {
      updateReservationById(data.id, data);
      navigateToHome();
    }
  }

  function makeNewRev() {
    if (isFormValid) {
      addNewReservation(data);
      navigateToHome();
    }
  }

  let isDateModalVisible = false;

  function handleDateDelete(event) {
    data.date = '';
    isDateModalVisible = false;
  }

  function handleDateSave(event) {
    data.date = `${event.detail.date} ${event.detail.time}`;
    isDateModalVisible = false;
  }
</script>

<div>
  <div class="header-style">
    <div class="icon-container-border" on:click={navigateToHome}>
      <img src={backIcon} />
    </div>
    <h1 class="header-text">{title} Reservation</h1>
    <div class="icon-container" on:click={navigateToClosed}>
      <img src={closeIcon} />
    </div>
  </div>
  <div class="form-container">
    <div>
      <div class="name-phone-date">
        <input
          class="normal-input"
          bind:value={data.name}
          type="text"
          required
          placeholder="Name"
        />
        <input
          class="normal-input"
          bind:value={data.phone}
          type="text"
          required
          placeholder="Phone"
        />
        <button class="date-input" on:click={() => (isDateModalVisible = true)}>
          <img src={calendarIcon} />
          {#if data.date}
            <span>{formatReservationDate(data.date)}</span>
          {:else}
            <span>Select Date</span>
          {/if}
        </button>
      </div>
      <div class="guests-tables">
        <div class="guests-container">
          <span>Guests</span>
          <button class="guests-btn" on:click={decrease}>-</button>
          <span>{data.count}</span>
          <button class="guests-btn" on:click={increase}>+</button>
        </div>
        <div class="dropdown" on:click={toggleDropdown}>
          <div class="dropdown-trigger">
            {#if data.table.length === 0}
              <div>Choose Tables</div>
            {:else}
              {#each data.table as table}
                <div class="selected-table">
                  table: {table.no}, floor: {table.floor}
                  <img
                    class="select-close-icon"
                    src={closeIcon}
                    on:click={() => removeTable(table)}
                  />
                </div>
              {/each}
            {/if}
          </div>
          {#if isSelectShowing}
            <div class="dropdown-menu">
              {#each $tableList as table}
                <div
                  on:click={() => {
                    selectTable(table);
                    closeDropdown();
                  }}
                >
                  table: {table.no}, floor: {table.floor}
                </div>
              {/each}
            </div>
          {/if}
        </div>
      </div>
      <div class="note-container">
        <textarea
          class="note-textarea"
          bind:value={data.note}
          placeholder="Note"
        ></textarea>
      </div>
    </div>
  </div>
</div>
<div class="btn-container">
  {#if id === undefined}
    <button
      class={isFormValid ? 'btn-active' : 'btn-active btn-deactive'}
      on:click={makeNewRev}>Save</button
    >
  {:else if isDataChanged}
    <DelBtn id={data.id} customEventAfter={navigateToHome} />
    <button
      class={isFormValid ? 'btn-active' : 'btn-active btn-deactive'}
      on:click={updateData}>Save</button
    >
  {:else}
    <DelBtn id={data.id} customEventAfter={navigateToHome} />
    <button class="btn-active" on:click={navigateToHome}>Seated</button>
  {/if}
</div>

{#if isDateModalVisible}
  <DateModal on:save={handleDateSave} on:delete={handleDateDelete} />
{/if}

<style lang="scss">
  .header-style {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 80px;
    padding: 0 20px;
    .icon-container-border {
      cursor: pointer;
      width: 60px;
      height: 60px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }
    .icon-container {
      cursor: pointer;
      width: 60px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .header-text {
      color: #353839;
      font-weight: 400;
    }
  }
  .form-container {
    padding: 40px 25px;
    .normal-input {
      padding-left: 12px;
      height: 45px;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
    }
    .date-input {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      height: 45px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }
    .name-phone-date {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }
    .select-close-icon {
      width: 12px;
      height: 12px;
    }
    .guests-tables {
      padding-top: 20px;
      display: flex;
      align-items: center;
      gap: 40px;
      .guests-container {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .guests-btn {
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
      .dropdown {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
        height: 45px;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        position: relative;
        cursor: pointer;
        .dropdown-trigger {
          display: flex;
          gap: 4px;
        }
        .dropdown-menu {
          background-color: #fff;
          z-index: 1;
          position: absolute;
          top: 45px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          border: 1px solid #e0e0e0;
          padding: 20px;
        }
      }
    }
    .note-container {
      padding-top: 20px;
      display: flex;
      .note-textarea {
        width: 100%;
        height: auto;
        resize: none;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        padding: 12px;
        line-height: 1.5;
      }
    }
  }
  .btn-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    padding: 0 20px;
    .btn-active {
      box-sizing: border-box;
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
    .btn-deactive {
      opacity: 0.5;
    }
  }
</style>
