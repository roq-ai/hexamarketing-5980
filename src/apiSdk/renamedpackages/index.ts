import axios from 'axios';
import queryString from 'query-string';
import { RenamedpackageInterface, RenamedpackageGetQueryInterface } from 'interfaces/renamedpackage';
import { GetQueryInterface } from '../../interfaces';

export const getRenamedpackages = async (query?: RenamedpackageGetQueryInterface) => {
  const response = await axios.get(`/api/renamedpackages${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createRenamedpackage = async (renamedpackage: RenamedpackageInterface) => {
  const response = await axios.post('/api/renamedpackages', renamedpackage);
  return response.data;
};

export const updateRenamedpackageById = async (id: string, renamedpackage: RenamedpackageInterface) => {
  const response = await axios.put(`/api/renamedpackages/${id}`, renamedpackage);
  return response.data;
};

export const getRenamedpackageById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/renamedpackages/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteRenamedpackageById = async (id: string) => {
  const response = await axios.delete(`/api/renamedpackages/${id}`);
  return response.data;
};
