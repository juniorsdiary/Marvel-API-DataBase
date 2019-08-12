import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import settings from '../../utilities/sliderSettings';
import { fetchEvents } from '../../store/actions/events';
import ApiFactory from '../../utilities/apiFactory';
import ComicBookPreview from '../ComicBookPreview/ComicBookPreview.jsx';
import Button from '../Button/Button.jsx';

const EventsSection = ({ eventsData, fetchEventsData, id, number, state, changeState }) => {
  useEffect(() => {
    const charactersAPI = ApiFactory.createApiHandler({ type: 'characters', id });
    charactersAPI.createApiString();
    const eventsAPI = ApiFactory.createApiHandler({ type: 'events', limit: 15 });
    let secondPart = eventsAPI.asSecondType();
    const apiStr = `${charactersAPI.api}${charactersAPI.query}${secondPart}`;
    fetchEventsData(apiStr);
  }, [fetchEventsData, id]);

  let renderEventsSlider = eventsData.map(eventItem => <ComicBookPreview key={eventItem.id} {...eventItem} />);
  const elemRef = useRef();
  useLayoutEffect(() => {
    elemRef.current.style.maxHeight = `${state ? 0 : elemRef.current.scrollHeight}px`;
  }, [state]);
  return (
    <>
      <h1 className='available_comics_title' onClick={changeState}>
        Encountered in {number} events
      </h1>
      <div className='events_section' ref={elemRef}>
        {eventsData.length >= 5 ? (
          <Slider {...settings} className='default_slider_block'>
            {renderEventsSlider}
          </Slider>
        ) : (
          <div className='static_comics_block'>{renderEventsSlider}</div>
        )}
        <Button className='show_more_comics_btn'>Show more</Button>
      </div>
    </>
  );
};

EventsSection.propTypes = {
  eventsData: PropTypes.array,
  fetchEventsData: PropTypes.func,
  id: PropTypes.string,
  number: PropTypes.number,
  state: PropTypes.bool,
  changeState: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    eventsData: state.eventsData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchEventsData: id => {
      dispatch(fetchEvents(id));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventsSection);
