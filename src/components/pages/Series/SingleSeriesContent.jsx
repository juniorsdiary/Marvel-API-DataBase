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
  EventsAccordeon,
  ComicsAccordeon,
  AdjacentItemLink,
} from 'Modules';

function SingleSeriesContent({ data }) {
  const { title, description, modified, thumbnail, urls, comics, creators, characters, events, previous, next } = data;
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
        slider={true}
        contentClassName='default_slider_block'
        title={`You can meet ${characters.available} characters`}
      />
      <ComicsAccordeon
        MappingComponent={SearchCard}
        number={comics.available}
        slider={true}
        contentClassName='default_slider_block'
        title={`Contains ${comics.available} comics`}
      />
      <EventsAccordeon
        MappingComponent={SearchCard}
        number={events.available}
        slider={true}
        contentClassName='default_slider_block'
        title={`Part of ${events.available} events`}
      />
      <CreatorsComponent data={creators.items} number={creators.available} location={location} pathname={'/creators'} />
    </div>
  );
}

SingleSeriesContent.propTypes = {
  data: PropTypes.object,
};

export default SingleSeriesContent;
