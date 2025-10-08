// Template: copy and adapt for each model
const mongoose = require('mongoose');

function makeController(Model) {
  const inMemory = [];
  function isDbConnected() {
    return mongoose && mongoose.connection && mongoose.connection.readyState === 1;
  }

  return {
    list: async (req, res) => {
      try {
        if (!isDbConnected()) return res.json(inMemory);
        const docs = await Model.find().limit(100).lean();
        res.json(docs);
      } catch (err) { res.status(500).json({ error: err.message }); }
    },
    get: async (req, res) => {
      try {
        if (!isDbConnected()) {
          const found = inMemory.find(p => p._id === req.params.id);
          if (!found) return res.status(404).json({ error: 'Not found' });
          return res.json(found);
        }
        const doc = await Model.findById(req.params.id).lean();
        if (!doc) return res.status(404).json({ error: 'Not found' });
        res.json(doc);
      } catch (err) { res.status(400).json({ error: 'Invalid id' }); }
    },
    create: async (req, res) => {
      try {
        const payload = req.body || {};
        if (!isDbConnected()) {
          const id = `mem_${Date.now()}`;
          const record = Object.assign({ _id: id, inserted_at: new Date() }, payload);
          inMemory.push(record);
          return res.status(201).json(record);
        }
        const created = await Model.create(payload);
        res.status(201).json(created);
      } catch (err) { res.status(500).json({ error: err.message }); }
    },
    update: async (req, res) => {
      try {
        if (!isDbConnected()) {
          const idx = inMemory.findIndex(p => p._id === req.params.id);
          if (idx === -1) return res.status(404).json({ error: 'Not found' });
          inMemory[idx] = Object.assign({}, inMemory[idx], req.body, { updated_at: new Date() });
          return res.json(inMemory[idx]);
        }
        const updated = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true }).lean();
        if (!updated) return res.status(404).json({ error: 'Not found' });
        res.json(updated);
      } catch (err) { res.status(400).json({ error: err.message }); }
    },
    remove: async (req, res) => {
      try {
        if (!isDbConnected()) {
          const idx = inMemory.findIndex(p => p._id === req.params.id);
          if (idx === -1) return res.status(404).json({ error: 'Not found' });
          inMemory.splice(idx, 1);
          return res.json({ success: true });
        }
        const removed = await Model.findByIdAndDelete(req.params.id).lean();
        if (!removed) return res.status(404).json({ error: 'Not found' });
        res.json({ success: true });
      } catch (err) { res.status(400).json({ error: err.message }); }
    }
  };
}

module.exports = makeController;
