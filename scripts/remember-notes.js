class RememberNotes {
  static ID = 'rememberNotes';

  static FLAGS = {
    MEMOS: 'memos'
  }

  static TEMPLATES = {
    REMEMBERNOTES: `modules/${this.ID}/templates/remember-notes.hbs`
  }
}

class MemoData {
  // all memos for all users
  static get allMemos() {
    const allMemos = game.users.reduce((accumulator, user) => {
      const userMemos = this.getMemosForUser(user.id);

      return {
        ...accumulator,
        ...userMemos
      }
    }, {});

    return allMemos;
  }

  // get all memos for a given user
  static getMemosForUser(userId) {
    return game.users.get(userId)?.getFlag(RememberNotes.ID, RememberNotes.FLAGS.MEMOS);
  }

  // create a new memo for a given user
  static createMemo(userId, memoData) {
    // generate random id for new Memo and populate userID
    const newMemo = {
      isPopUp: false,
      label: '',
      ...memoData,
      id: foundry.utils.randomID(16),
      userId
    }

    // construct the update to insert new Memo
    const newMemos = {
      [newMemo.id]: newMemo
    }

    // update database with new Memos
    return game.users.get(userId)?.setFlag(RememberNotes.ID, RememberNotes.FLAGS.MEMOS, newMemos);
  }

  // update a specific memo by id with the provided updateData
  static updateMemo(memoId, updateData) {
    const relevantMemo = this.allMemos[memoId];

    // construct the update to send
    const update = {
      [memoId]: updateData
    }

    // update database with updated memo list
    return game.users.get(relevantMemo.userId)?.setFlag(RememberNotes.ID, RememberNotes.FLAGS.MEMOS, update);
  }

  // delete a specific memo by id
  static deleteMemo(memoId) {}
}