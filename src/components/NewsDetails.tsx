/* eslint-disable @next/next/no-img-element */
"use client"

import React, { useEffect, useState } from 'react';

import Link from 'next/link';


export interface NewsItem {
  title?: string;
  url?: string;
  urlToImage?: string;
  author?: string;
  description?: string;
  source: { name?: string };
  publishedAt?: string;
}

export interface Props {
  newsItem: NewsItem;
}


const NewsDetails: React.FC<Props> = ({ newsItem }) => {
  if (!newsItem) {
    return <div>Loading...</div>;
  }


  return (
    <div className="min-h-screen bg-gray-800">
      <div className="max-w-screen-xl px-4 pt-6 pb-4 mx-auto overflow-hidden">
        <div className="w-full h-[500px] flex flex-col justify-center items-center">
          {newsItem.urlToImage ? (
            <img
              src={newsItem.urlToImage}
              alt={newsItem.title}
              loading="lazy"
              className="object-cover w-[50%] h-[400px]"
            />
          ) : (
            <div className="bg-purple-900">
              <p>No Image</p>
            </div>
          )}
          <p>
            <strong>Author: </strong>
            {newsItem.author || 'No author'}
          </p>
          <p>{newsItem.description}</p>
          <p>
            <strong>Source: {newsItem?.source?.name || 'No Source Name'}</strong>
          </p>
          <Link href="/news" className="border px-10 rounded">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewsDetails;
