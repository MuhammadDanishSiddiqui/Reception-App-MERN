const express = require("express");
const { loadData, saveData } = require("../utils");
const router = new express.Router();

router.post("/visitors", (req, res) => {
  const data = loadData();
  data.push(req.body);
  saveData(data);
  res.status(201).send({
    success: true,
    data: req.body,
    error: "",
    message: "Created Successfully!",
  });
});

router.get("/visitors", (req, res) => {
  const data = loadData();
  res.status(200).send({
    success: true,
    data,
    error: "",
    message: "All Data Fetched Successfully!",
  });
});

router.get("/visitors/:id", (req, res) => {
  const data = loadData();
  const visitorData = data.find((item) => item.id === Number(req.params.id));

  if (!visitorData) {
    res.status(404).send({
      success: false,
      data: {},
      error: "Data Not Found!",
      message: "Unable To Fetch Data!",
    });
  } else {
    res.status(200).send({
      success: true,
      data: visitorData,
      error: "",
      message: "Data Fetched Successfully",
    });
  }
});

router.patch("/visitors/:id", (req, res) => {
  const data = loadData();
  const index = data.findIndex((item) => item.id == Number(req.params.id));

  if (index == -1) {
    res.status(404).send({
      success: false,
      data: {},
      error: "Data Not Found!",
      message: "Unable To Update Data",
    });
  } else {
    const temp = [...data];
    temp[index] = { ...req.body, id: Number(req.params.id) };
    saveData(temp);
    res.status(200).send({
      success: true,
      data: temp[index],
      error: "",
      message: "Data Updated Successfully!",
    });
  }
});

router.delete("/visitors/:id", (req, res) => {
  const data = loadData();
  const index = data.findIndex((item) => item.id == Number(req.params.id));

  if (index == -1) {
    res.status(404).send({
      success: false,
      data: {},
      error: "Data Not Found!",
      message: "Unable To Delete Data",
    });
  } else {
    const temp = [...data];
    temp.splice(index, 1);
    saveData(temp);
    res.status(200).send({
      success: true,
      data: data[index],
      error: "",
      message: "Data Deleted Successfully!",
    });
  }
});

module.exports = router;
