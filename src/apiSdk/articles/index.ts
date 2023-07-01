import axios from 'axios';
import queryString from 'query-string';
import { ArticleInterface, ArticleGetQueryInterface } from 'interfaces/article';
import { GetQueryInterface } from '../../interfaces';

export const getArticles = async (query?: ArticleGetQueryInterface) => {
  const response = await axios.get(`/api/articles${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createArticle = async (article: ArticleInterface) => {
  const response = await axios.post('/api/articles', article);
  return response.data;
};

export const updateArticleById = async (id: string, article: ArticleInterface) => {
  const response = await axios.put(`/api/articles/${id}`, article);
  return response.data;
};

export const getArticleById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/articles/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteArticleById = async (id: string) => {
  const response = await axios.delete(`/api/articles/${id}`);
  return response.data;
};
