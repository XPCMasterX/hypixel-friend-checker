let ownUUID = '08adf3db-7e0a-448b-aad3-321390a3b09b';

/* #region */
/* 
.-:::::'...    ::::::.    :::.  .,-::::::::::::::::::::    ...   :::.    :::. .::::::. 
;;;'''' ;;     ;;;`;;;;,  `;;;,;;;'````';;;;;;;;'''';;; .;;;;;;;.`;;;;,  `;;;;;;`    ` 
[[[,,==[['     [[[  [[[[[. '[[[[[            [[     [[[,[[     \[[,[[[[[. '[['[==/[[[[,
`$$$"``$$      $$$  $$$ "Y$c$$$$$            $$     $$$$$$,     $$$$$$ "Y$c$$  '''    $
 888   88    .d888  888    Y88`88bo,__,o,    88,    888"888,_ _,88P888    Y88 88b    dP
 "MM,   "YmmMMMM""  MMM     YM  "YUMMMMMP"   MMM    MMM  "YMMMMMP" MMM     YM  "YMmMY" 
 */

// /**
//  * Returns the UUID of API key owner
//  * @param {string} apiKey
//  * @returns {string} UUID of API key owner
//  */
// async function getUUID(apiKey) {
//   let result = await fetch(`https://api.hypixel.net/key?key=${apiKey}`)
//     .then((result) => result.json())
//     .then((result) => {
//       return result;
//     });
//   return result.record.owner;
// }

/**
 * Gets the friends of the player
 * @param {string} apiKey
 * @returns {Array} UUIDs
 */
async function getFriends(apiKey, ownUUID) {
    let results = await fetch(
        `https://api.hypixel.net/friends?key=${apiKey}&uuid=${ownUUID}`
    )
        .then((result) => result.json())
        .then((result) => {
            return result.records;
        });

    ownUUID = ownUUID.replace(/[- ]/g, '');

    let UUIDArray = [];

    for (let i = 0; i < results.length; i++) {
        if (results[i].uuidSender === ownUUID) {
            UUIDArray.push(results[i].uuidReceiver);
        } else {
            UUIDArray.push(results[i].uuidSender);
        }
    }

    return UUIDArray;
}

/**
 * Converts UUID to display name
 * @param {string} apiKey
 * @param {string} UUID
 * @returns {string} Name
 */
async function getNameFromUUID(apiKey, UUID) {
    let results = fetch(
        `https://api.hypixel.net/player?key=${apiKey}&uuid=${UUID}`
    )
        .then((result) => result.json())
        .then((result) => {
            return result.player.displayname;
        });
    return results;
}

/**
 * Converts an array of UUIDs to display names
 * @param {string} apiKey
 * @param {Array} UUIDArray
 * @param {string} ownUUID
 * @returns {Array} Display names
 */
async function convertToNames(apiKey, UUIDArray, ownUUID) {
    ownUUID = ownUUID.replace(/[- ]/g, '');

    let names = [];

    for (let i = 0; i < UUIDArray.length; i++) {
        let name = await getNameFromUUID(apiKey, UUIDArray[i]);
        names.push(name);
    }

    return names;
}

/**
 * Checks if a player is online or not
 * @param {string} apiKey
 * @param {string} UUID
 * @returns {boolean} Online status
 */
async function checkOnlineStatus(apiKey, UUID) {
    let result = fetch(
        `https://api.hypixel.net/status?key=${apiKey}&uuid=${UUID}`
    )
        .then((result) => result.json())
        .then((result) => {
            return result.session.online;
        });
    return result;
}

/**
 * Sorts friends array to the online ones at
 * the start
 * @param {Array} friends
 * @returns {Array} sortedFriends
 */
async function sortFriends(friends) {
    let sortedFriends = [];
    for (let i = 0; i < friends.length; i++) {
        if (friends[i].onlineStatus === true) {
            sortedFriends.push(friends[i]);
        }
    }
    for (let i = 0; i < friends.length; i++) {
        if (friends[i].onlineStatus === false) {
            sortedFriends.push(friends[i]);
        }
    }
    return sortedFriends;
}

/**
 * Checks the online status of all the friends of a player
 * @param {string} apiKey
 * @returns {Array} Objects containing name of player and their online status
 */
async function checkOnlineStatusOfFriends(apiKey, update) {
    let friendsUUID = await getFriends(apiKey, ownUUID);
    let friends = await convertToNames(apiKey, friendsUUID, ownUUID);
    let friendsWithStatus = [];

    for (let i = 0; i < friendsUUID.length; i++) {
        let onlineStatus = await checkOnlineStatus(apiKey, friendsUUID[i]);
        let lastLogin = await getLastLogin(apiKey, friendsUUID[i]);
        lastLogin = await formatUnixTimeStamp(lastLogin);

        friendsWithStatus.push({
            name: friends[i],
            onlineStatus: onlineStatus,
            lastLogin: lastLogin,
        });
        await update(i, friendsUUID.length);
    }
    await update(friendsUUID.length, friendsUUID.length);

    let sortedFriends = await sortFriends(friendsWithStatus);
    return sortedFriends;
}

/**
 * Returns how long ago a player was online
 * @param {string} apiKey 
 * @param {string} UUID 
 * @returns {Date} timestamp
 */
async function getLastLogin(apiKey, UUID) {
    let result = fetch(
        `https://api.hypixel.net/player?key=${apiKey}&uuid=${UUID}`
    )
        .then((result) => result.json())
        .then((result) => {
            return (
                ((Date.now() / 1000) | 0) - ((result.player.lastLogout / 1000) | 0)
            );
        });
    return result;
}

/**
 * Formats timestamp into human readable form
 * @param {integer} timestamp 
 * @returns 
 */
async function formatUnixTimeStamp(timestamp) {
    let time = {
        seconds: timestamp % 60,
        minutes: Math.floor(timestamp / 60) % 60,
        hours: Math.floor(timestamp / 3600) % 24,
        days: Math.floor(timestamp / 86400),
    };
    return `${time.days} days, ${time.hours} hours ago`;
}
/* #endregion */

export { checkOnlineStatusOfFriends };
