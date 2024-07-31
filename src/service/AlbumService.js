import axios from "axios";

const port = 8000;
const apiVersion = 1;
const baseUrl = `http://localhost:${port}/api/v${apiVersion}/album`;

const consumer = axios.create({ 
  baseURL: baseUrl,
  headers: {
    "Content-Type": "aplication/json",
  }
});

export const search = (name) => consumer.get(`/search?name=${name}`);

export const create = (album) => consumer.post("", album);

export const getById = (id) => consumer.get(`/${id}`);

export const getAll = () => consumer.get("");

export const update = (id, album) => consumer.put(`/${id}`, album);

export const remove = (id) => consumer.delete(`/${id}`);