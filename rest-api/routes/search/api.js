const algoliasearch = require("algoliasearch");

/// ALGOLIA CONFIGURATION
const client = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_PRIVATE_API_KEY
);

const index = client.initIndex("submissions");

module.exports = {
  addNewItem: async (item) => {
    await index.saveObject({
      objectID: item.id,
      // item, comment, ...
      type: "item",
      // author
      by: item.by,
      // post title
      title: item.title,
      // news or ask
      itemType: item.type,
      // (if news) raw url
      url: item.url,
      // (if news) domain name
      domain: item.domain,
      // (if ask) text
      text: item.text,
      // unsure
      created: item.created,
      points: item.points,
      commentCount: item.commentCount,
      // tags: item.tags,
      // category: item.category,
    });

    return { success: true };
  },

  editItem: async (id, newItemTitle, newItemText) => {
  // editItem: async (id, newItemTitle, newItemText, newCategory) => {
  // editItem: async (id, newItemTitle, newItemText, newTags, newCategory) => {
    await index.partialUpdateObject({
      objectID: id,
      title: newItemTitle,
      text: newItemText,
      // tags: newTags,
      // category: newCategory,
    });

    return { success: true };
  },

  deleteItem: async (id) => {
    await index.deleteObject(id);

    return { success: true };
  },

  updateItemPointsCount: async (id, newPointsValue) => {
    await index.partialUpdateObject({
      objectID: id,
      points: newPointsValue,
    });

    return { success: true };
  },

  addNewComment: async (comment, parentItemId, newCommentCount) => {
    await index.saveObject({
      objectID: comment.id,
      type: "comment",
      by: comment.by,
      parentItemId: comment.parentItemId,
      parentItemTitle: comment.parentItemTitle,
      isParent: comment.isParent,
      parentCommentId: comment.parentCommentId,
      text: comment.text,
      points: comment.points,
      created: comment.created,
    });

    // update parent item count
    await index.partialUpdateObject({
      objectID: parentItemId,
      commentCount: newCommentCount,
    });

    return { success: true };
  },

  editComment: async (id, newCommentText) => {
    await index.partialUpdateObject({
      objectID: id,
      text: newCommentText,
    });

    return { success: true };
  },

  deleteComment: async (id, parentItemId, newCommentCount) => {
    await index.deleteObject(id);

    await index.partialUpdateObject({
      objectID: parentItemId,
      newCommentCount: newCommentCount,
    });

    return { success: true };
  },

  updateCommentPointsValue: async (id, newPointsValue) => {
    await index.partialUpdateObject({
      objectID: id,
      points: newPointsValue,
    });

    return { success: true };
  },

  deleteKilledComment: async (id) => {
    await index.deleteObject(id);
    return { success: true };
  },

  addUnkilledComment: async (comment) => {
    await index.saveObject({
      objectID: comment.id,
      type: "comment",
      by: comment.by,
      parentItemId: comment.parentItemId,
      parentItemTitle: comment.parentItemTitle,
      isParent: comment.isParent,
      parentCommentId: comment.parentCommentId,
      text: comment.text,
      points: comment.points,
      created: comment.created,
    });
    return { success: true };
  },
};
