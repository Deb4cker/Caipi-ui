import axios from "axios";

const port = 8000;
const apiVersion = 1;
const baseUrl = `http://localhost:${port}/api/v${apiVersion}/track`;

const consumer = axios.create({ 
  baseURL: baseUrl,
  headers: {
    "Content-Type": "aplication/json",
  }
});

export const create = (track) => consumer.post("", track);

export const getById = (id) => consumer.get(`/${id}`);

export const getAll = () => consumer.get("");

export const update = (id, track) => consumer.put(`/${id}`, track);

export const remove = (id) => consumer.delete(`/${id}`);