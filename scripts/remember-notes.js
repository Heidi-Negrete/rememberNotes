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
  static getMemoForUser(userId) {}

  // create a new memo for a given user
  static createMemo(userId, memoData) {}

  // update a specific memo by id with the provided updateData
  static updateMemo(memoID, updateData) {}

  // delete a specific memo by id
  static deleteMemo(memoId) {}
}