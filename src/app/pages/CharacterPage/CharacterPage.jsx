import React, { useEffect } from 'react';
import { fetchSingleCharacter } from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
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

const CharacterPage = ({ match }) => {
  let id = match.params.id;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSingleCharacter(id));
  }, [dispatch, id]);
  const characterData = useSelector(state => state.singleCharacter);
  return (
    <div>
      <h1>{characterData.name}</h1>
    </div>
  );
};
CharacterPage.propTypes = {
  match: PropTypes.object,
};

export default CharacterPage;
