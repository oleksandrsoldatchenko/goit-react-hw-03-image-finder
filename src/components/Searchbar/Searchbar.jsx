import React, { Component } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import style from './Searchbar.module.css';

export default class Searchbar extends Component {
  static defaultProps = {
    onSearch: PropTypes.func.isRequired,
  };

  state = {
    searchRequest: '',
  };

  handleRequestChange = event => {
    this.setState({ searchRequest: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.searchRequest.trim() === '') {
      return toast.warning('Search field is empty!');
    }
    this.props.onSearch(this.state.searchRequest);
    this.setState({ searchRequest: '' });
  };

  render() {
    return (
      <header className={style.Searchbar}>
        <form className={style.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={style.SearchForm_button}>
            <span className={style.SearchForm_button_label}>Search</span>
          </button>

          <input
            className={style.SearchForm_input}
            type="text"
            name="searchRequest"
            value={this.state.searchRequest}
            onChange={this.handleRequestChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
