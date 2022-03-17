<script>
    import { checkOnlineStatusOfFriends } from './hypixel_api_helper/hApiHelper';
    import { fade } from 'svelte/transition';
    import { onMount } from 'svelte';
    let loading = true;
    let progressText = ``;
    let friends = [];
    let apiKey = 'c980cce5-9f42-42b9-950b-a0d2750a828f';
    async function updateData() {
        friends = await checkOnlineStatusOfFriends(apiKey, updateProgress);
        console.log(friends);
        loading = false;
        return;
    }
    function updateProgress(i, len) {
        progressText = `${i} / ${len}`;
    } // Number from 0.0 to 1.0

    onMount(() => {
        updateData();
    });
</script>

<main>
    {#if loading}
        <div class="cont" transition:fade>
            <div class="spinner">
                <div class="looping-rhombuses-spinner">
                    <div class="rhombus" />
                    <div class="rhombus" />
                    <div class="rhombus" />
                </div>
                <p class="progress-text">{progressText}</p>
            </div>
        </div>
    {/if}
    {#if !loading}
        {#each friends as friend}
            {#if friend.onlineStatus}
                <div class="friend-container online">
                    <span class="name">{friend.name}</span>
                    <span class="status">online</span>
                </div>
            {:else if !friend.onlineStatus}
                <div class="friend-container offline">
                    <span class="name">{friend.name}</span>
                    <span class="status">offline</span>
                </div>
            {/if}
        {/each}
    {/if}
</main>

<style>
    main {
        height: 100%;
        width: 100%;
    }

    .cont {
        background-color: #ff1d5e;
        height: 100%;
        width: 100%;
    }

    .friend-container {
        margin: 2em;
        padding: 1em;
        border-radius: 5px;
        color: white;
    }

    .offline {
        background-color: red;
    }

    .online {
        background-color: green;
    }

    .status {
        float: right;
    }

    .progress-text {
        color: white;
        text-align: center;
        font-family: Roboto;
        margin-top: 1em;
    }

    @keyframes fade {
        from {
            background-color: #ff1d5e;
        }
        to {
            background-color: white;
        }
    }

    @keyframes unfade {
        to {
            background-color: #ff1d5e;
        }
        from {
            background-color: white;
        }
    }

    .spinner {
        position: absolute;
        top: 50%;
        left: 50%;
        -moz-transform: translateX(-50%) translateY(-50%);
        -webkit-transform: translateX(-50%) translateY(-50%);
        transform: translateX(-50%) translateY(-50%);
    }

    /* credit: vasili savitski, epicmax */
    .looping-rhombuses-spinner,
    .looping-rhombuses-spinner * {
        box-sizing: border-box;
    }

    .looping-rhombuses-spinner {
        width: calc(15px * 4);
        height: 15px;
        position: relative;
    }

    .looping-rhombuses-spinner .rhombus {
        height: 15px;
        width: 15px;
        background-color: white;
        left: calc(15px * 4);
        position: absolute;
        margin: 0 auto;
        border-radius: 2px;
        transform: translateY(0) rotate(45deg) scale(0);
        animation: looping-rhombuses-spinner-animation 2500ms linear infinite;
    }

    .looping-rhombuses-spinner .rhombus:nth-child(1) {
        animation-delay: calc(2500ms * 1 / -1.5);
    }

    .looping-rhombuses-spinner .rhombus:nth-child(2) {
        animation-delay: calc(2500ms * 2 / -1.5);
    }

    .looping-rhombuses-spinner .rhombus:nth-child(3) {
        animation-delay: calc(2500ms * 3 / -1.5);
    }

    @keyframes looping-rhombuses-spinner-animation {
        0% {
            transform: translateX(0) rotate(45deg) scale(0);
        }
        50% {
            transform: translateX(-233%) rotate(45deg) scale(1);
        }
        100% {
            transform: translateX(-466%) rotate(45deg) scale(0);
        }
    }
</style>
