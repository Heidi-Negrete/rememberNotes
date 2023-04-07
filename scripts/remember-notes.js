class RememberNotes {
  static ID = 'remember-notes';

  static FLAGS = {
    MEMOS: 'memos'
  }

  static TEMPLATES = {
    REMEMBERNOTES: `modules/${this.ID}/templates/remember-notes.hbs`
  }
}

class MemoData {
  // all memos for all users
  static get allMemos() {}

  // get all memos for a given user
  static getMemoForUser(userId) {
    return game.users.get(userId)?.getFlag(RememberNotes.ID, RememberNotes.FLAGS.MEMOS);
  }

  // create a new memo for a given user
  static createMemo(userId, memoData) {
    // generate random id for new Memo and populate userID
    const newMemo = {
      isPopUp: false,
      ...memoData,
      id: foundry.utils.randomID(16),
      userId,
      label: "" //label?
    }

    // construct the update to insert new Memo
    const newMemos = {
      [newMemo.id]: newMemo
    }

    // update database with new Memos
    return game.users.get(userId)?.setFlag(RememberNotes.id, RememberNotes.FLAGS.MEMOS, newMemos);
  }

  // update a specific memo by id with the provided updateData
  static updateMemo(memoID, updateData) {}

  // delete a specific memo by id
  static deleteMemo(memoId) {}
}