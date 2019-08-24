import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { IoIosFunnel, IoIosCloseCircleOutline } from 'react-icons/io';
import { fetchCharacters, types } from 'Store';
import { ApiFactory } from 'Utilities';
import { CharacterCard, Pagination, ContentComponent, InputElement, FormGroup, Button } from 'Modules';
import { withLoader } from 'Components/hocs.jsx';

const ContentComponentWithLoader = withLoader()(ContentComponent);

class CharachtersList extends Component {
  state = {
    startsWith: '',
    order: 'name',
    offset: 0,
    hiddenState: true,
  };

  componentDidMount() {
    const { location } = this.props;
    const apiCheck = ApiFactory.apiHash.filter(item => item.pathname === location.pathname).length;
    const lastApicall = ApiFactory.apiHash.filter(item => item.pathname === location.pathname).slice(-1)[0];
    if (!apiCheck) {
      this.loadData();
    } else {
      if (lastApicall.search) {
        this.loadData();
      }
    }
  }

  loadData = () => {
    const { fetchHeroes, setFetchingState, location } = this.props;
    const { startsWith, order, offset } = this.state;
    const apiHandler = ApiFactory.createApiHandler({ pathname: location.pathname, search: location.search, startsWith, offset, order });
    const apiStr = apiHandler.createApiString();
    setFetchingState(true);
    fetchHeroes(apiStr);
  };

  setOffsetValue = offset => {
    this.setState({ offset }, () => {
      this.loadData();
    });
  };

  setHiddenState = hiddenState => {
    this.setState({ hiddenState });
  };

  setStateValue = e => {
    let startsWith = e.target.value;
    this.setState({ startsWith });
  };

  setOrderValue = e => {
    let order = e.target.value;
    this.setState({ order });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.loadData();
  };

  render() {
    const { startsWith, order, offset, hiddenState } = this.state;
    const { charactersList, isFetching, totalResults } = this.props;

    return (
      <div className='page_content'>
        <IoIosFunnel size='25' onClick={() => this.setHiddenState(false)} className='filter_icon' />
        <FormGroup className={`characters_filter_form ${hiddenState ? 'hidden_block' : ''}`}>
          <IoIosCloseCircleOutline size='25' onClick={() => this.setHiddenState(true)} className='close_icon' />
          <InputElement
            id='startsWith'
            inputClass='parametrs_list__startsWith_input'
            wrapperClass='parametrs_startsWith_wrapper'
            label='name starts with'
            onChange={this.setStateValue}
            value={startsWith}
          />
          <div className='parametrs_order_wrapper'>
            <p className='parametrs_order_title'>Order:</p>
            <InputElement
              id='order_asc'
              name='name'
              inputClass='parametrs_list__order_input'
              wrapperClass='asc_order_input_wrapper'
              activeClass={order === 'name' ? 'checked' : ''}
              type='radio'
              label='A-Z'
              onChange={this.setOrderValue}
              value='name'
            />
            <InputElement
              id='order_desc'
              name='name'
              inputClass='parametrs_list__order_input'
              wrapperClass='desc_order_input_wrapper'
              activeClass={order === '-name' ? 'checked' : ''}
              type='radio'
              label='Z-A'
              onChange={this.setOrderValue}
              value='-name'
            />
          </div>
          <Button className='search_btn' type='submit' onClick={() => this.handleSubmit()}>
            Search
          </Button>
        </FormGroup>
        {!isFetching && <Pagination setOffset={this.setOffsetValue} totalResults={totalResults} offset={offset} />}
        <ContentComponentWithLoader loading={isFetching} renderData={charactersList} PartialComponent={CharacterCard} />
      </div>
    );
  }
}

CharachtersList.propTypes = {
  fetchHeroes: PropTypes.func,
  setFetchingState: PropTypes.func,
  charactersList: PropTypes.array,
  isFetching: PropTypes.bool,
  totalResults: PropTypes.number,
  offset: PropTypes.number,
  location: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    charactersList: state.charactersData.charactersList,
    totalResults: state.charactersData.totalResults,
    offset: state.charactersData.offset,
    isFetching: state.charactersData.isFetching,
    router: state.router,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchHeroes: url => {
      dispatch(fetchCharacters(url));
    },
    setFetchingState: boolean => {
      dispatch({ type: types.CHARACTERS_FETCHING, payload: boolean });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CharachtersList);
