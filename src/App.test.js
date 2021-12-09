import { useEffect, useState } from 'react';
import axios from 'axios';
import { formatNavigations } from './links';
import './App.css';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

describe('App component', () => {
 test('it displays the icons and names', async () => {
   render(<App />);


   const linkList = await waitFor(() => screen.getByTestId('link-list'));
   expect(linkList).toBeInTheDocument();
 });
});

jest.mock('axios');

const notWorking = [{
  "id": 1,
  "name": "Test link 1",
  "link": "testlink1",
 }, {
  "id": 2,
  "name": "Test link 2",
  "link": "testlink2",
 }];

describe('App component', () => {

 test('it displays new links', async () => {
   axios.get.mockResolvedValue({ data: notWorking });
   render(<App />);


   const linkList = await waitFor(() => screen.findAllByTestId('link-item'));
   expect(linkList).toHaveLength(2);
 });
});

test('it displays links in a row', async () => {
  axios.get.mockResolvedValue({ data: notWorking });
  render(<App />);


  const linkList = await waitFor(() => screen.findAllByTestId('link-item'));
  expect(linkList).toHaveLength(3);
});