const { Model } = require('objection');

class KVModel extends Model {
    static get tableName() {
        return 'kv_store';
    }
}

module.exports = KVModel;