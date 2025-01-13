const fs = require("fs");
const path = require("path");
const { uuid, v4: uuidv4 } = require("uuid");
const notesArray = require("../storage/notes");
const { get } = require("http");

const pathSave = path.join(__dirname, "..", "storage/notes.log");

const createNotes = async (req, res) => {
  try {
    const { title, tags, body } = req.body;
    if (!title || !tags || !body) {
      const error = new Error("Body Kosong");
      error.message = "title/tags/body harus di isi";
      throw error;
    }
    const id = uuidv4();
    const data = {
      id: id,
      title,
      tags,
      body,
      createdAt: new Date().toISOString(),
    };

    notesArray.push(data);

    return res.status(200).send({
      status: "success",
      message: "Catatan Berhasil Ditambahkan",
      data: {
        noteId: id,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send({
      status: "Gagal",
      message: err.message || "Bad Request",
    });
  }
};

const getNotes = function (req, res) {
  return res.status(200).send({
    status: "success",
    message: "Berhasil Mengambil Data Notes",
    data: {
      notes: notesArray,
    },
  });
};
const getNotesById = function (req, res) {
  const id = req.params.id;
  const noteFind = notesArray.filter((note) => note.id == id);
  if (!noteFind) {
    return res.status(400).send({
      status: "Gagal",
      message: "Id Tidak dapat ditemukan",
    });
  }
  console.log(id);
  return res.status(200).send({
    status: "success",
    message: "Berhasil Mengambil Data Notes",
    data: {
      notes: noteFind,
    },
  });
};
const updateNotes = function (req, res) {
  const id = req.params.id;
  const body = req.body;
  console.log(id);
  const noteFindIndex = notesArray.findIndex((note) => note.id === id);
  if (noteFindIndex == -1) {
    return res.status(400).send({
      status: "Gagal",
      message: "Id Tidak dapat ditemukan",
    });
  }
  notesArray[noteFindIndex] = {
    ...notesArray[noteFindIndex],
    ...body,
    updatedAt: new Date().toISOString(),
  };
  return res.status(200).send({
    status: "success",
    message: "Berhasil Mengubah Data Notes",
    data: {
      notes: notesArray[noteFindIndex],
    },
  });
};

module.exports = {
  createNotes,
  getNotes,
  getNotesById,
  updateNotes,
};
