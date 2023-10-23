class MatchingService {
  constructor () {
    this.Queues = {
      "Easy": [],
      "Medium": [],
      "Hard": [],
    }
  }

  leaveQueue (checkSocketid) {
    for (const difficulty in this.Queues) {
      for (let i = this.Queues[difficulty].length - 1; i >= 0; i--) {
        if (this.Queues[difficulty][i].socketid === checkSocketid) {
          this.Queues[difficulty].splice(i, 1);
        }
      }
    }
  }

  isEmpty (difficulty) {
    return this.Queues[difficulty].length == 0;
  }

  joinQueue (difficulty, socketid) {
    const newUser = { socketid };
    this.Queues[difficulty].push(newUser);
  }

  popQueue (difficulty) {
    const queue = this.Queues[difficulty];
    for (let i = 0; i < queue.length; i++) {
      const matchedUser = queue.splice(i, 1)[0];
      console.log(matchedUser)
      return matchedUser
    }
    return null
  }
}
module.exports = MatchingService
