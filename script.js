let apiKey = "c980cce5-9f42-42b9-950b-a0d2750a828f";
let ownUUID = "08adf3db-7e0a-448b-aad3-321390a3b09b";

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

  ownUUID = ownUUID.replace(/[- ]/g, "");

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
  ownUUID = ownUUID.replace(/[- ]/g, "");

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
 * Checks the online status of all the friends of a player
 * @param {string} apiKey
 * @returns {Array} Objects containing name of player and their online status
 */
async function checkOnlineStatusOfFriends(apiKey) {
  let friendsUUID = await getFriends(apiKey, ownUUID);
  let friends = await convertToNames(apiKey, friendsUUID, ownUUID);
  let friendsWithStatus = [];

  for (let i = 0; i < friendsUUID.length; i++) {
    let onlineStatus = await checkOnlineStatus(apiKey, friendsUUID[i]);
    friendsWithStatus.push({
      name: friends[i],
      onlineStatus: onlineStatus,
    });
  }

  return friendsWithStatus;
}

async function appendListItemToDOM(id, string) {
  let ul = document.getElementById(id);
  let li = document.createElement("li");
  li.textContent = string;

  ul.appendChild(li);
}

async function friendsToDom(apiKey) {
  let data = await checkOnlineStatusOfFriends(apiKey);

  for (let i = 0; i < data.length; i++) {
    appendListItemToDOM("ul", `${data[i].name} - ${data[i].onlineStatus}`);
  }
}
/* #endregion */
