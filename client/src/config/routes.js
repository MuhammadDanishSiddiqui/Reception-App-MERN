import React from "react";
import { Routes, Route } from "react-router-dom";
import EntryForm from "../components/entryForm";
import Visitors from "../components/visitors";

function Router() {
  return (
    <Routes>
      <Route exact path="/" element={<EntryForm />} />
      <Route exact path="/entry" element={<EntryForm />} />
      <Route exact path="/entry/:id" element={<EntryForm />} />
      <Route exact path="/visitors" element={<Visitors />} />
    </Routes>
  );
}

export default Router;
