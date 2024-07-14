// will use singleton class which will hold
// map object with room beign mapped to players
class RoomPlayerMap {
  constructor() {
    this.rooms = {};
  }

  static getInstance() {
    if (!RoomPlayerMap.instance) {
      RoomPlayerMap.instance = new RoomPlayerMap();
    }
    return RoomPlayerMap.instance;
  }

  addPlayer(roomId, playerName) {}
}
