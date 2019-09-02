import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { PreviewItem } from 'Modules';

const CreatorsComponent = ({ data, number, history, pathname }) => {
  const search = history.location.pathname
    .split('/')
    .join('=')
    .replace(/=/, '?');
  const content = data.map((item, index) => <PreviewItem key={index} {...item} />);
  return (
    <div className='creators_content_block'>
      <p className='creators_content_title'>{`${number} creators`}</p>
      {content}
      {number > 15 && (
        <Link to={{ pathname, search }} className='show_more_link styled_btn'>
          Show More
        </Link>
      )}
    </div>
  );
};

CreatorsComponent.propTypes = {
  number: PropTypes.number,
  data: PropTypes.array,
  history: PropTypes.object,
  pathname: PropTypes.string,
};

export default withRouter(CreatorsComponent);
