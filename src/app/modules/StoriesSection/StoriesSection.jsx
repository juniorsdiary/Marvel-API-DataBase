import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import settings from '../../utilities/sliderSettings';
import { fetchStories } from '../../store/actions/stories';
import ApiFactory from '../../utilities/apiFactory';
import ComicBookPreview from '../ComicBookPreview/ComicBookPreview.jsx';
import Button from '../Button/Button.jsx';

const StoriesSection = ({ storiesData, fetchStoriesData, id, number }) => {
  useEffect(() => {
    const charactersAPI = ApiFactory.createApiHandler({ type: 'characters', id });
    charactersAPI.createApiString();
    const storiesAPI = ApiFactory.createApiHandler({ type: 'stories', limit: 15 });
    let secondPart = storiesAPI.asSecondType();
    const apiStr = `${charactersAPI.api}${charactersAPI.query}${secondPart}`;
    // console.log(`${charactersAPI.query}${secondPart}`);
    fetchStoriesData(apiStr);
  }, [fetchStoriesData, id]);
  let renderStoriesSlider = storiesData.map(storyItem => <ComicBookPreview key={storyItem.id} {...storyItem} />);
  return (
    <div className='stories_section'>
      <h1 className='available_comics_title'>Encountered in {number} stories</h1>
      {storiesData.length >= 5 ? (
        <Slider {...settings} className='default_slider_block'>
          {renderStoriesSlider}
        </Slider>
      ) : (
        <div className='static_comics_block'>{renderStoriesSlider}</div>
      )}
      <Button className='show_more_comics_btn'>Show more</Button>
    </div>
  );
};

StoriesSection.propTypes = {
  storiesData: PropTypes.array,
  fetchStoriesData: PropTypes.func,
  id: PropTypes.string,
  number: PropTypes.number,
};

const mapStateToProps = state => {
  return {
    storiesData: state.storiesData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchStoriesData: id => {
      dispatch(fetchStories(id));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StoriesSection);
