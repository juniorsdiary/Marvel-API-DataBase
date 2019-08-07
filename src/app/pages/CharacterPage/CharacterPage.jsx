import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSingleCharacter } from '../../store/actions';
import PropTypes from 'prop-types';
import * as types from '../../store/types';
import Loader from '../../modules/Loader/Loader.jsx';
import Slider from '../../modules/Slider/Slider.jsx';
import ImageAvatar from '../../modules/ImageAvatar/ImageAvatar.jsx';

// id: The unique ID of the character resource.,
// name: The name of the character.,
// description: A short bio or description of the character.,
// modified: The date the resource was most recently modified.,
// resourceURI: The canonical URL identifier for this resource.,
// urls: A set of public web site URLs for the resource.,
// thumbnail: The representative image for this character.,
// comics: A resource list containing comics which feature this character.,
// stories: A resource list of stories in which this character appears.,
// events: A resource list of events in which this character appears.,
// series: A resource list of series in which this character appears.
class CharacterPage extends Component {
  componentDidMount() {
    const { fetchData, setFetchingState, match } = this.props;
    const id = match.params.id;
    setFetchingState(true);
    fetchData(id);
  }
  render() {
    const { characterData, isFetching } = this.props;
    const { name, description } = characterData;
    return (
      <div className='character_page_block'>
        {!isFetching ? (
          <div className='character_data_wrapper'>
            <ImageAvatar className='character_image_wrapper' src={`${characterData.thumbnail.path}.${characterData.thumbnail.extension}`} />
            <div className='character_data_details'>
              <h1 className='character_data_title'>{name}</h1>
              <p className='character_data_description'>{description ? description : `We are sorry! :( We couldn't find any description`}</p>
            </div>

            <Slider className='character_comics_slider'></Slider>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    );
  }
}
CharacterPage.propTypes = {
  match: PropTypes.object,
  fetchData: PropTypes.func,
  characterData: PropTypes.object,
  setFetchingState: PropTypes.func,
  isFetching: PropTypes.bool,
};

const mapStateToProps = state => {
  return {
    characterData: state.singleCharacter,
    isFetching: state.isFetching,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: id => {
      dispatch(fetchSingleCharacter(id));
    },
    setFetchingState: boolean => {
      dispatch({ type: types.IS_FETCHING, payload: boolean });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CharacterPage);
