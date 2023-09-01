/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

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

const NewsCard: React.FC<Props> = ({ newsItem }) => {
  const { title, url, urlToImage, author, description, source, publishedAt } =
    newsItem;

  return (
    <div className="lg:flex lg:flex-col lg:items-center mb-5 rounded-lg  md:gap-2 md:mx-2 md:w-80 sm:w-80 ">
      <Link
        href={`/news/${encodeURIComponent(url as string)}`}
        // href={`/news/${encodeURIComponent((url) as string)}`}
        // href={`${url}`}
        // href={`[url]`}
        className="relative block w-full overflow-hidden rounded-lg shadow-lg h-72 md:h-96 group"
      >

        {urlToImage ? (
          <img
            src={urlToImage}
            alt={title}
            loading="lazy"
            className="absolute z-0 object-cover w-full h-full transform md:h-full group-hover:scale-150"
          />
        ) : (
          <div className="absolute w-full h-full bg-purple-900 ">
            <p className="text-4xl text-center text-red-600 ">No Image</p>
          </div>
        )}

        <div className="absolute z-10 w-full transition duration-300 gradient group-hover:bg-black group-hover:opacity-90 h-72 md:h-96"></div>
        <div className="absolute bottom-0 left-0 right-0 z-30 p-6 transition duration-300 delay-100 transform translate-y-1/2 group-hover:translate-y-0">
          <div className="relative h-1/2">
            <div className="absolute bottom-0">
              <h2 className="pb-6 text-xl font-bold leading-tight text-white transition duration-300">
                {title}
              </h2>
            </div>
          </div>
          <div className="h-1/2">
            <p className="pb-2 text-white transition duration-300 opacity-0 group-hover:opacity-100">
              <strong>short : </strong>
              {author || "no author"}
            </p>
            <p className="pb-1 text-white transition duration-300 opacity-0 group-hover:opacity-100">
              {description || "No description"}
            </p>
            <p className="pb-2 text-white transition duration-300 opacity-0 group-hover:opacity-100">
              <strong>{source.name || "no name"}</strong>
            </p>
            <button className="px-5 py-1 text-sm font-semibold text-red-500 transition duration-300 bg-white border-2 border-white opacity-0 group-hover:opacity-100 focus:border-black focus:bg-gray-300">
              Read More
            </button>
          </div>
        </div>

      </Link>

    </div>
  );
};
export default NewsCard;
