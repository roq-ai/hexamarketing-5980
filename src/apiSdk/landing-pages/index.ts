import axios from 'axios';
import queryString from 'query-string';
import { LandingPageInterface, LandingPageGetQueryInterface } from 'interfaces/landing-page';
import { GetQueryInterface } from '../../interfaces';

export const getLandingPages = async (query?: LandingPageGetQueryInterface) => {
  const response = await axios.get(`/api/landing-pages${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createLandingPage = async (landingPage: LandingPageInterface) => {
  const response = await axios.post('/api/landing-pages', landingPage);
  return response.data;
};

export const updateLandingPageById = async (id: string, landingPage: LandingPageInterface) => {
  const response = await axios.put(`/api/landing-pages/${id}`, landingPage);
  return response.data;
};

export const getLandingPageById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/landing-pages/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteLandingPageById = async (id: string) => {
  const response = await axios.delete(`/api/landing-pages/${id}`);
  return response.data;
};
