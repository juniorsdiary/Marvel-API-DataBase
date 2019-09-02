import React from 'react';
import PropTypes from 'prop-types';
import { convertToLocale } from 'Utilities';
import {
  CreatorsComponent,
  ImageAvatar,
  DetailsSection,
  SearchCard,
  CharacterCard,
  CharactersAccordeon,
  SeriesAccordeon,
  ComicsAccordeon,
  AdjacentItemLink,
} from 'Modules';

function EventContent({ data }) {
  const { title, description, modified, thumbnail, urls, comics, creators, characters, series, previous, next } = data;
  const src = thumbnail.path ? `${thumbnail.path}.${thumbnail.extension}` : '';
  const lastModified = convertToLocale(modified);
  return (
    <div className='items_data_wrapper'>
      <h1 className='data_title'>{title}</h1>
      <ImageAvatar WrapperComponent={'div'} className='cover_book_image' src={src} />
      <DetailsSection name={title} description={description} url={urls && urls[0].url} lastModified={lastModified} />
      {previous && <AdjacentItemLink data={previous} title='Previous' />}
      {next && <AdjacentItemLink data={next} title='Next' />}
      <CharactersAccordeon
        MappingComponent={CharacterCard}
        number={characters.available}
        contentClassName='default_slider_block'
        title={`You can meet ${characters.available} characters`}
      />
      <ComicsAccordeon
        MappingComponent={SearchCard}
        number={comics.available}
        contentClassName='default_slider_block'
        title={`Contains ${comics.available} comics`}
      />
      <SeriesAccordeon
        MappingComponent={SearchCard}
        number={series.available}
        contentClassName='default_slider_block'
        title={`Contains ${series.available} series`}
      />
      <CreatorsComponent data={creators.items} number={creators.available} pathname={'/creators'} />
    </div>
  );
}

EventContent.propTypes = {
  data: PropTypes.object,
};

export default EventContent;
