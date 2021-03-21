const { queryDatabase } = require("../database");
const { Block } = require("../database/models");
const { getError } = require("./errors");
const { makeItem } = require("./utils");

/**
 * Save block info to the database
 * @param {*} block
 */
async function addBlock(block) {
  try {
    if (!block) throw ValidationError("block");

    const inputFields = ["user", "habit", "startDate", "doneDays"];
    let newBlock = makeItem(block, inputFields);
    block = new Block(newBlock);
    block = await block.save();
    return { block: makeItem(block, ["id", "user", "habit", "startDate"]) };
  } catch (err) {
    throw await getError(err);
  }
}

/**
 * Get blocks info from database
 * @param {Object} query
 * @param {String[]} attributes
 */
async function getBlocks({
  query,
  attributes = ["id", "user", "habit", "startDate", "doneDays"],
}) {
  let blocks;
  try {
    if (!query || !query.id) {
      blocks = await queryDatabase({ model: Block, query, attributes });
    } else {
      blocks = await _checkBlockPresence({ query, attributes });
    }
  } catch (err) {
    throw await getError(err);
  }

  return { count: blocks.length, data: blocks };
}

/**
 * Check if the block with the given parameters exists in the database
 * @param {object} query
 * @param {String[]} attributes
 */
async function _checkBlockPresence({ query, attributes = ["id"] }) {
  try {
    const blocks = await queryDatabase({ model: Block, query, attributes });
    if (!blocks || !blocks.length) throw new NotFoundError("block");
    return blocks;
  } catch (err) {
    throw await getError(err);
  }
}

module.exports = {
  getBlocks,
  addBlock,
};
